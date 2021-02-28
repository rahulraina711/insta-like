import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Post from './Post'
import PostEditor from './PostUploader';
import "./home.scss";
import UserContext from '../../context/UsesrContext';
import domain from '../../util/domain';

function Home(){
    const {user} = useContext(UserContext);

    const global = domain+'/posts/';
    //const personal = domain+'/user?email='+user.email;
    //console.log(global, personal);

    const [defaultPosts, setMyPosts] = useState(global);
    const [posts, setPosts] = useState([]);
    const [newPostUploaderOPen, setNewPostUploaderOpen] = useState(false); //not open by default
    const [editPostData, setEditPostData] = useState(null);

    
  
    useEffect(() => {
        // get all the posts here
        getPosts();
    },[]);

    function myPosts(){
        setMyPosts(domain+"/user?email="+user.email);
        getPosts();
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

    function renderPosts(){
        let sortedPosts = [...posts];
        sortedPosts = sortedPosts.sort((a, b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return sortedPosts.map((post, i)=>{
            return <Post key={i} post={post} defaultUrl = {defaultPosts} getPosts={getPosts} editPost={editPost} user={user} myPosts={myPosts} setMyPosts={setMyPosts}/>
        })
    }

    
    
    
    return <div className="home">
        {user ?(<div className="current-user">Welcome {user.email}</div>):(<div className="current-user">Please Sign-in to like and comment</div>)}
        {!newPostUploaderOPen && user && <button className="btn-add-post" onClick={()=>setNewPostUploaderOpen(true)}>
            Add Post
            </button>}
            {user && <button className="btn-my-post" onClick={myPosts}>My Posts</button>}
            {newPostUploaderOPen && <PostEditor setNewPostUploaderOpen={setNewPostUploaderOpen} getPosts={getPosts} editPostData={editPostData} /> }
        {renderPosts()}
    </div>
}

export default Home;