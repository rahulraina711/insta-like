import React from 'react';
import './comments.scss';

function Comments(props){
    return <div className="indi-comment">
                <div className="comment-box">
                    <div className="comment-by">{props.comment.email} said:</div>
                    <div className="comment-container">{props.comment.comment}</div>
                </div>
    </div> ;
}

export default Comments;