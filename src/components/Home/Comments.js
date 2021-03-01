import React from 'react';
import './comments.scss';
import {Link} from 'react-router-dom';

function Comments(props){
    return <div className="indi-comment">
                <div className="comment-box">
                    <div className="comment-by"> <Link to="#" className="link">{props.comment.email}</Link>  : {props.comment.comment}
                    </div>
                    
                </div>
    </div> ;
}

export default Comments;