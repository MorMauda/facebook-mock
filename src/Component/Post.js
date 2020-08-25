import React, {useEffect, useState} from "react";
import {CalendarToday, Comment, KeyboardArrowDown, Reply, ThumbUpAlt, Lock, LockOpen, AttachFile, Attachment} from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import {Comments} from "./Comment";
import {CommentEditor} from "./CommentEditor";
import ImgUploadPopUp from "./ImgUploadPopUp1";

const url = "http://localhost:4000";

function getComments(setComments) {

    axios.post(url+'/comments')
        .then(res => {
            setComments(res.data);
        })
        .catch(err => {
            alert("Something went wrong when trying to fetch data from 'Comments' table.\n" + err);
        })
}
export const Post = ({User , Post ,children}) => {

    const [clickedLock, setClickedLock] = useState(false)
    const [isImgLoader, setImgLoader] = useState(false);

    // const [pictureUploaded, setPictureUploaded] = useState(false)

    const [likes, setLikes] = useState([]);
    useEffect(() => {
        axios.get(url +'/likes/' + (Post && Post.post_id))
            .then(res => {
                setLikes(res.data[0].likes);
            })
            .catch(err => {
                alert("Something went wrong when trying to fetch data from 'Likes' table.\n" + err);
            })
    }, []);

    const handleLikeDB = () => {
        axios.post(url+'/likes', {
            user_id: Post && Post.user_id,
            post_id: Post && Post.post_id
        })
            .then(response => {
                // alert("added like to post no. : " + Post && Post.post_id);
            })
            .catch(error => {
                alert("Failed to add Like to this post: " + error);
            })

    }


    const [comments, setComments] = useState([]);

    useEffect(()=>{
        getComments(setComments);
    })
    const changePostPrivacy = () => {

        axios.put(url+'/posts/' + (Post && Post.post_id) + '/' + User.userId, {
            private: (Post && Post.private == 0 ? 1 : 0),
            user_id: User.userId,
            post_id: (Post && Post.post_id)
        })
            .then(response => {
                if (User.userId == Post.user_id) {
                    alert("Privacy of post no. :" + Post.post_id + " changed.");
                }else{
                    alert("You can only change privacy for your own Posts.");

                }
            })
            .catch(error => {
                alert("Failed to change privacy to this post: " + error);
            })
    }

    const uploadPostPicture = (imgPath) => {
        axios.put('http://localhost:4000/posts/'+ Post.post_id+'/'+Post.user_id, {
            images : imgPath
        })
            .then(res => {
                Post.images = imgPath;
                alert("Successfully uploaded picture to post!");
                // setPictureUploaded(true);
                handleImgClosed(false);

            })
            .catch(err => {
                alert("Something went wrong - Can't upload cover pic.\n" + err);
            })
    }
    const handleImgAdd = () => {
        // if (Post.user_id == User.userId) {
            setImgLoader(true);
        // }else{
        //     alert("You can only upload pictures to your posts.")
        // }
    }

    const handleImgClosed = () => {
        setImgLoader(false);

    }

    return (
        <div id='post' className="post">
            <div className="tb">
                <a href="#" className="td p-p-pic">
                    <img src={(Post && Post.img) ? require(""+Post.img) : ""}
                         alt={"poster img"}/></a>
                <div className="td p-r-hdr">
                    <div className="p-u-info">
                        <a href="#">{Post && Post.first_name}  { Post &&  Post.last_name}</a> Post:
                        ({Post && Post.post_id})
                    </div>
                    <div className="p-dt"><CalendarToday></CalendarToday>
                        <span>{moment(Post.date).format("DD-MM-YYYY hh:mm:ss")}</span>
                    </div>
                </div>
                <div className="td p-opt"><KeyboardArrowDown></KeyboardArrowDown></div>

            </div>
            <p>{Post && Post.content}</p>
            <img src= {Post.images != undefined ? require(""+ Post.images) : ""} />


            <div>
                <div className="p-acts">
                    <div className="p-act like">

                        <button onClick={() => {
                            setLikes(likes + 1)
                            handleLikeDB();
                        }}>
                            <ThumbUpAlt></ThumbUpAlt><span>{likes}</span></button>
                    </div>

                    <div className="p-act comment">

                        <Comment></Comment>
                        <span>{comments.filter((c => c.post_id == Post.post_id)).length}</span>
                    </div>
                    {/*render text area only if ifCommentEditorOpen == true and commentEditor*/}


                    <div className="p-act attachFile">
                        { (Post.user_id == User.userId) ?
                            <button type="button" onClick={handleImgAdd}><Attachment></Attachment></button> :
                            ""
                        }
                        {/*<button type="button" onClick={handleImgAdd}><Attachment></Attachment></button>*/}

                    </div>

                    <div className="p-act share">
                        <button onClick={() =>  {
                            (User.userId == Post.user_id && setClickedLock(locked => !locked))
                            changePostPrivacy();
                            Post.private = (Post.private == 0 ? 1 : 0);
                            console.log("Post.private : " + Post.private);
                        }}>
                            {clickedLock ? (Post.private ==0 ?<LockOpen />:<Lock />) : (Post.private ==0 ?<LockOpen />:<Lock />) }

                        </button>

                    </div>


                </div>
                <div>
                <ul>
                    {comments.filter((c => c.post_id == Post.post_id)).map((comment, j) => (

                        <Comments user={User} post={Post} comment={comment}></Comments>
                    ))}
                </ul>
                <CommentEditor onCommentAdded={() => getComments(setComments)} user={User}
                               post={Post}></CommentEditor>
                </div>
                {/*{children}*/}
                {isImgLoader? <ImgUploadPopUp uploadType={"post"} updatePostPicture={(imageUrl)=> uploadPostPicture(imageUrl)} OnImgUploadWindowClose={() => handleImgClosed()}></ImgUploadPopUp> : null}

            </div>
        </div>
    );

};

