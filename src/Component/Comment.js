import {CalendarToday, Comment, KeyboardArrowDown, Lock, LockOpen, ThumbUpAlt} from "@material-ui/icons";
import React from "react";
import moment from "moment";

export const Comments = ({user , post, comment }) => {

    return (
        <div id='post' className="post">
            <div className="tb">
                <a href="#" className="td p-p-pic"><img

                    src={require(""+comment.img)}
                    // src = {currentUser && currentUser.img}
                    alt={comment.img}/></a>
                <div className="td p-r-hdr">
                    <div className="p-u-info">
                        <a href="#">{comment.first_name} {comment.last_name}</a> commented on : ({post.post_id})
                    </div>
                    <div className="p-dt"><CalendarToday></CalendarToday>
                        <span>{moment(comment.date).format("DD-MM-YYYY hh:mm:ss")}</span>
                    </div>
                </div>
            </div>

            <span>{comment && comment.content}</span>


        </div>
    );
}