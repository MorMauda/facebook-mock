import React, {useState} from "react";
import axios from "axios";
const url = "http://localhost:4000";


export const CommentEditor = ({user , post, onCommentAdded}) => {

    const [input, setInput] = useState();

    const handleCommentEditor = (e) => {
        setInput(e.target.value);

        if (e.key === 'Enter') {
            if (!input) {
                alert("Your comment can't be empty...");
                return;
            }
            axios.post(url +'/addComment', {
                post_id: (post && post.post_id),
                user_id: (user && user.userId),
                content: input
            }).then(response => {
                alert("New Comment for post no." + post.post_id + " created successfully.");
                console.log("Success! ", response);
                onCommentAdded();

            }).catch(error => {
                if (error.response === 401) alert(error.response.data.message);
                else alert("Something went wrong. Please try again later.");
            });
        }
    }


    return (
        <div id='commentEditor' className="commentEditor">
            <div className="tb">
                {/*<a href="#" className="td p-p-pic"><img src={require("" + user.img)} alt={user.img}/></a>*/}
                <div id ="input-editor">
                    <input type="text" placeholder="Write your comment here..." size={50} onKeyDown={handleCommentEditor}/>
                </div>
            </div>



        </div>
    );

}

