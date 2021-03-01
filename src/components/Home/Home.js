import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Post from './Post'
import PostEditor from './PostUploader';
import "./home.scss";
import UserContext from '../../context/UsesrContext';
import { Link } from 'react-router-dom';
import domain from '../../util/domain';

function Home(){
    const {user} = useContext(UserContext);

    const global = domain+'/posts/';

    const [time, setTime] = useState(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString())
    const [defaultPosts, setMyPosts] = useState(global); //get global posts >>> get personal posts
    const [posts, setPosts] = useState([]);
    const [newPostUploaderOPen, setNewPostUploaderOpen] = useState(false); // cannot upload without logging in >>> can upload after
    const [editPostData, setEditPostData] = useState(null); // cannot edit your post without logging in >>> can do it after

    //update time
    setTimeout(() => {
        setTime(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString());
    }, 1000);

    // get the requested posts (global or personal everytime a new post is added);   
    useEffect(() => {
        // get all the posts here
        getPosts();
    },[defaultPosts]);

    // to get user specific posts
    function myPosts(){
        setMyPosts(domain+"/user?email="+user.email);
        //getPosts();
    }

    //to get all the posts
    async function getPosts(){
        const postsRes = await axios.get(defaultPosts)
        console.log(postsRes.data)
        setPosts(postsRes.data)
    }

    // to edit the post data
    function editPost(postData){
        setEditPostData(postData);
    }

    // render posts from Post component
    function renderPosts(){
        let sortedPosts = [...posts];
        sortedPosts = sortedPosts.sort((a, b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return sortedPosts.map((post, i)=>{
            return <Post key={i} post={post} defaultUrl = {defaultPosts} getPosts={getPosts} editPost={editPost} user={user} myPosts={myPosts} setMyPosts={setMyPosts}/>
        })
    }

    
    
    // render the hoome page
    return <div className="home">
        {/* {terinary statements to determine whether a user is logged in on not} */}
        {user ?(<div className="current-user"><div>Welcome {user.email}</div><div>{time}</div></div>):(<div className="current-user">Please <Link to="/login">Log-in</Link> to like and comment</div>)}
        {!newPostUploaderOPen && user && <button className="btn-add-post" onClick={()=>setNewPostUploaderOpen(true)}>
            Add Post
            </button>}
            {user && <button className="btn-my-post" onClick={myPosts}>My Posts</button>}
            {newPostUploaderOPen && <PostEditor setNewPostUploaderOpen={setNewPostUploaderOpen} getPosts={getPosts} editPostData={editPostData} /> }
        {renderPosts()}
    </div>
}

export default Home;