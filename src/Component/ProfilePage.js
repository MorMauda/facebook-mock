import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../ProfilePage.css';
import {DynamicSearchBar} from './DynamicSearchBar';
import {Post} from './Post';
import ImgUploadPopUp from "./ImgUploadPopUp1";
import {
    Search, Notifications, ChatBubble, PersonAdd, KeyboardArrowDown, Subject, InsertEmoticon,
    Videocam, Event, CameraEnhance, CameraAlt, Edit, LocationOn, AvTimer, People, Photo,
    Lock, Explore, Archive, Autorenew, FormatListBulleted ,ExitToApp,SportsEsports
} from '@material-ui/icons';
import {removeUserSession} from "../Utils/Common";
import {HelloWorld} from "./HelloWorld";


const url = "http://localhost:4000";


function ProfilePage(props) {

    const [User, setUser] = useState(props.location.state.data);
    const [isImgLoader, setImgLoader] = useState(false);
    const [uploadType, setUploadType] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isEditButtonPressd ,setEditButton] = useState(false)



    // useEffect(() => {
    const getPosts =() => {
        axios.post(url+'/posts2', { //Get my friend posts and mine. (beside those who is private)
            user_id: User.userId
        })
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                alert("Something went wrong when trying to fetch data from 'Posts' table.\n" + err);
            })
    }

    getPosts();
    const handleImgAdd = () => {

        setImgLoader(true);

    }

    const handleImgClosed = () => {
        setImgLoader(false);

    }
    const handleNewPost = (e) => {
        let content = e.target.value;
        if (e.key === 'Enter') {
            if (!content) {
                alert("Your post can't be empty...");
                return;
            }
            axios.post(url  + '/posts', {
                user_id: User.userId,
                content: content,
                private: 0
            }).then(response => {
                alert("New Post created.");
                getPosts()

            }).catch(error => {
                if (error.response === 401) alert(error.response.data.message);
                else alert("Something went wrong. Please try again later.");
            });
        }
    }

    const updateUserProfilePicture = (imgPath) => {
        axios.put(url+'/users/'+ User.userId, {
            img : imgPath
        })
            .then(res => {
                User.img = imgPath;
                setUser(User);
                alert("Successfully uploaded a profile pic!")
            })
            .catch(err => {
                alert("Something went wrong when - Can't upload profile pic.\n" + err);
            })
    }


    const updateUserCoverPicture = (imgPath) => {
        axios.put('http://localhost:4000/users/'+ User.userId, {
            cover_img : imgPath
        })
            .then(res => {
                User.cover_img = imgPath;
                setUser(User);
                alert("Successfully uploaded a cover pic!")

            })
            .catch(err => {
                alert("Something went wrong - Can't upload cover pic.\n" + err);
            })
    }

    const handleNewFriend = (friend_id) => {
        axios.post(url  + '/friends', {
            friend_id: User.userId,
            follower_id: friend_id
        }).catch(err => {
            if (err.response === 401) alert(err.response.data.message);
            else alert("Something went wrong. Please try again later.");
        })

        axios.post(url  + '/friends', {
            friend_id: friend_id,
            follower_id: User.userId
        }).then(res => {
            alert("You became friend with user : " + friend_id );
            // setNewFriendship(true);
            getPosts();
            setPosts(posts);

        }).catch(err => {
            if (err.response === 401) alert(err.response.data.message);
            else alert("Something went wrong. Please try again later.");
        })

    }

    const handleEditPressed =() =>{
        setEditButton(!isEditButtonPressd);
    }
    const changeAboutMe =(e) =>{
        let content = e.target.value;
        if (e.key === 'Enter') {
            console.log(content);
            axios.put(url+'/users/'+User.userId,
                {
                    about: content
                })
                .then(res => {
                    User.aboutMyself = content;
                    setEditButton(!isEditButtonPressd);
            })
        }

    }
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    const handleMemoryGame =() =>{
        return window.location.href = 'http://localhost:8080/micha';
    }
    return (
        <main>

            <header>
                <div className="tb">
                    <div className="td" id="logo">
                        {/*<a href="#"><i className="fab fa-facebook-square"></i></a>*/}
                        <button onClick={handleLogout}><ExitToApp/></button>
                    </div>
                    <div className="td" id="search-form">

                        <form method="get" action="#">
                            {/*<input type="text" placeholder="Search Afeka-book" value= {word} onChange={e => handleChangeSearchBar(e.target.value)}/>*/}
                            <DynamicSearchBar handleNewFriend={(friend_id)=>{handleNewFriend(friend_id) }}/>

                            <button type="submit"><Search></Search></button>
                        </form>
                    </div>
                    <div className="td" id="f-name-l"><span>{User.firstName}'s semi-facebook</span>
                    </div>
                    <div className="td" id="i-links">
                        <div className="tb">
                            <div className="td" id="m-td">
                                <div className="tb">
                                    <span className="td"> <PersonAdd></PersonAdd>  </span>
                                    <span className="td"> <ChatBubble></ChatBubble>  </span>
                                    <span className="td m-active"> <Notifications></Notifications>  </span>
                                    <button className="td" onClick={handleMemoryGame}> <SportsEsports></SportsEsports>  </button>

                                </div>
                            </div>
                            <div className="td">
                                <a href="#" id="p-link">
                                    <img src={require(""+User.img)}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div id="profile-upper">
                <div id="profile-banner-image">
                    <img src={User && require(""+User.cover_img)} alt="Banner image"/>

                </div>
                <div id="profile-d">
                    <div id="profile-pic">

                        <button className="profile-pic" onClick={()=>{
                            setUploadType("profile")
                            handleImgAdd();
                        }}>
                            <img className="profile-pic" src={require(""+User.img)}/>
                        </button>
                    </div>

                    <div id="u-name">{User.firstName} {User.lastName}</div>
                    <div className="tb" id="m-btns">
                        <div className="td">
                            <div className="m-btn">
                                <FormatListBulleted></FormatListBulleted><span>Activity log</span>
                            </div>
                        </div>
                        <div className="td">
                            <div className="m-btn"><Lock></Lock><span>Privacy</span></div>
                        </div>
                    </div>
                    <div id="edit-profile">
                        <button onClick={()=> {
                            setUploadType("cover")
                            handleImgAdd();
                        }}><CameraAlt></CameraAlt></button>
                    </div>
                </div>
                <div id="black-grd"></div>
            </div>
            <div id="main-content">
                <div className="tb">
                    <div className="td" id="l-col">
                        <div className="l-cnt">
                            <div className="cnt-label">
                                <i className="l-i" id="l-i-i"></i>
                                <span>Intro</span>
                                {/*<div className="lb-action"><Edit></Edit></div>*/}
                                <button className="lb-action" onClick={handleEditPressed}><Edit/></button>

                            </div>
                            <div id="i-box">
                                <div id="intro-line">A about my self... :)</div>
                                {isEditButtonPressd ? <input id="u-occ" type="text" placeholder={User.aboutMyself}
                                                    onKeyDown={(e)=>{changeAboutMe(e)}}/> :
                                <div id="u-occ">{User.aboutMyself}</div> }
                                <div id="u-loc"><LocationOn></LocationOn> <a href="#">Israel</a></div>
                            </div>
                        </div>
                        <div className="l-cnt l-mrg">
                            <div className="cnt-label">
                                <i className="l-i" id="l-i-p"></i>
                                <span>Photos</span>
                                <div className="lb-action" id="b-i"><KeyboardArrowDown></KeyboardArrowDown></div>
                            </div>
                            <div id="photos">
                                <div className="tb">
                                    <div className="tr">
                                        <div className="td"></div>
                                        <div className="td"></div>
                                        <div className="td"></div>
                                    </div>
                                    <div className="tr">
                                        <div className="td"></div>
                                        <div className="td"></div>
                                        <div className="td"></div>
                                    </div>
                                    <div className="tr">
                                        <div className="td"></div>
                                        <div className="td"></div>
                                        <div className="td"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="t-box">
                            <div id="cpy-nt">Facebook &copy; <span id="curr-year"></span></div>
                        </div>
                    </div>
                    <div className="td" id="m-col">
                        <div className="m-mrg" id="p-tabs">
                            <div className="tb">
                                <div className="td">
                                    <div className="tb" id="p-tabs-m">
                                        <div className="td active"><AvTimer></AvTimer><span>TIMELINE</span></div>
                                        <div className="td"><People></People><span>FRIENDS</span>
                                        </div>
                                        <div className="td"><Photo></Photo><span>PHOTOS</span>
                                        </div>
                                        <div className="td"><Explore></Explore><span>ABOUT</span>
                                        </div>
                                        <div className="td"><Archive></Archive><span>ARCHIVE</span></div>
                                    </div>
                                </div>
                                <div className="td" id="p-tab-m"><KeyboardArrowDown></KeyboardArrowDown></div>
                            </div>
                        </div>
                        <div className="m-mrg" id="composer">
                            <div id="c-tabs-cvr">
                                <div className="tb" id="c-tabs">
                                    <div className="td active"><Subject></Subject><span>Make Post</span></div>
                                    <div className="td"><CameraEnhance></CameraEnhance><span>Photo/Video</span>
                                    </div>
                                    <div className="td"><Videocam></Videocam><span>Live Video</span></div>
                                    <div className="td"><Event></Event><span>Life Event</span>
                                    </div>
                                </div>
                            </div>
                            <div id="c-c-main">
                                <div className="tb">
                                    <div className="td" id="p-c-i">
                                        <img src={require(""+User.img)} alt="Profile pic"/>
                                    </div>
                                    <div className="td" id="c-inp">
                                        <input type="text" placeholder="What's on your mind?"  onKeyDown={handleNewPost}/>
                                        {/*<AttachFile></AttachFile>*/}

                                    </div>
                                </div>


                                <br/><br/>
                                <div id="insert_emoji"><InsertEmoticon></InsertEmoticon></div>
                            </div>

                        </div>
                        <div>

                            {posts.map((post, i) => (
                                <div key={i}>
                                    <Post User={User} Post={post} ></Post>


                                    <br/><br/>
                                </div>


                            ))}

                        </div>


                        <br/><br/>
                    </div>

                </div>
            </div>


            <div id="loading"><Autorenew></Autorenew></div>
            {isImgLoader ? <ImgUploadPopUp OnImgUploadWindowClose={() => handleImgClosed()}
                                           updateUserProfilePicture={(imageUrl)=> updateUserProfilePicture(imageUrl)}
                                           updateUserCoverPicture={(imageUrl)=> updateUserCoverPicture(imageUrl)}
                                           uploadType={uploadType}/> : null}


        </main>

    );

}


export default ProfilePage;
