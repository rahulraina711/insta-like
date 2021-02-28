import React , {useState} from 'react';
import axios from 'axios';
import "./post-uploader.scss"
import domain from '../../util/domain';

function PostEditor(props){
    const [editorDescription, setEditorDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(undefined)

    function fileUploadHandler(event){
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className="post-editor">
                <form onSubmit={savePost}>
                    <textarea id="editor-description" type="text" placeholder="Enter some description here" value={editorDescription} onChange={(e)=>setEditorDescription(e.target.value)}/>
                    <input id="editor-upload" type="file" onChange={fileUploadHandler}/>

                </form>
                <button className="btn-upload" type="submit" onClick={savePost}>Upload Post</button><button className="btn-cancel" type="button" onClick={closeEditor}>Cancel</button>
            </div>
    )
    async function savePost(e){
        e.preventDefault();
    
        const postData = new FormData();
        postData.append('desc',editorDescription);
        postData.append('postImage',selectedFile);
        console.log(postData);
        await axios.post(domain+"/posts/", postData).then(res=>console.log(res));
    
        props.getPosts();
        closeEditor();
    }
    function closeEditor(){
        props.setNewPostUploaderOpen(false);
        setEditorDescription("");
        setSelectedFile(undefined);
    }
}







export default PostEditor;