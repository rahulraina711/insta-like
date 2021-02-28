/* eslint-disable jsx-a11y/alt-text */
import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import "./Post.scss";
import Comment from './Comments'

function Post(props){
    const [comments, setComments] = useState([]);
    const user = props.user;
    const [writeComment, setWriteComment] = useState("");

    const[likeBtnState, setLikeBtnState] = useState("btn-not-like")
    const [likes, setLikes] = useState(props.post.likes.length);

    useEffect(() => {
        // get all the posts here
        getComments();
    },[]);

    //to get all the posts
    async function getComments(){

        const commentsRes = await axios.get("http://localhost:3100/comments/"+props.post._id);
        if (props.post.likes.includes( await user.userId)){
            setLikeBtnState("btn-like");
        };
        //console.log(commentsRes.data)
        setComments(commentsRes.data)
    }

    async function deletePost(){
        await axios.delete('http://localhost:3100/posts/'+props.post._id);

        props.getPosts();
    };

    function renderComments(){
        return comments.map((comment, i)=>{
            return <Comment key={i} comment={comment} getComments={getComments} user={user}/>
        })
    }

    function commentHandler(event){
        setWriteComment(event.target.value);
    }

    async function postComment(){
        setWriteComment("");
        const commentData= {
            "comment":writeComment,
            "postId":props.post._id
        }

        await axios.post("http://localhost:3100/comments/"+props.post._id, commentData).then(res=>console.log(res));
        getComments();
        
    }

    async function changeLikeBtnState(){
        const likeData = {
            "postId":props.post._id,
            "userId":user.userId
        }
        if(likeBtnState==="btn-not-like"){
            setLikeBtnState("btn-like");
            await axios.put("http://localhost:3100/posts/like",likeData);
            props.getPosts();
            setLikes(likes+1);
        }
        else if(likeBtnState==="btn-like"){
            setLikeBtnState("btn-not-like");
            await axios.put("http://localhost:3100/posts/unlike",likeData);
            props.getPosts();
            setLikes(likes-1);
        };
        
    }
    // async function userProfile(){
    //     await props.setMyPosts("http://localhost:3100/user?email="+user.email);
    //     await props.getPosts();
    // };


    return <div className="post">
        <div className="left">
        {props.post.email && <h2 className="name">By <button className="btn-user-profile" >{props.post.email}</button> </h2>}
        <img className="image" src={"http://localhost:3100/"+props.post.postImage} height="400" width="300"></img>
        {user && (<button className={likeBtnState} onClick={changeLikeBtnState}>Likes :{likes}</button>)}
        {props.post.desc && <h2 className="desc">{props.post.desc}</h2>}
        {props.defaultUrl!=='http://localhost:3100/posts/' &&<button className="btn-delete" onClick={deletePost}>Delete Post</button>}
        
        </div>
        <div className="right">
                <div className="comments">Comments
                    {renderComments()}
                </div>
                {user && (<div className="add-comments">Add Comments
                    <textarea className="comment-input" onChange={commentHandler} value={writeComment} />
                    <button className="btn-comment" onClick={postComment}>Post Comment</button>
                </div>)}
        </div>
    </div>
}

export default Post;