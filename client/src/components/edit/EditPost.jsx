import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostEditor from '../PostEditor';
import { FaCamera } from "react-icons/fa";

function EditPost() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);


  const { id } = useParams();
  
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState('')
  const [content, setContent]  = useState('')
  const [category, setCategory] = useState("Html")
 const [file, setFiles] = useState("")
 
 const [redirect, setRedirect] = useState('false')
 const [profilImage, setProfilImage] = useState("")
 

  useEffect(() => {
    // Fetch existing post data
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => {
        res.json().then((postInfo) => {
          setTitle(postInfo.title);
          setSummary(postInfo.summary);
          setContent(postInfo.content);
          setFiles(postInfo.cover); 
          setCategory(postInfo.category)

        });

      });

  }, [id]);
  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    data.set('file', fileInputRef.current.files[0]);

    if (file) {
      // If a file is associated with the post, you can send its filename or an identifier
      data.set('existingFile', file);
    }

    const res = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      //use cookies 
      credentials: 'include',
    });

    if (res.ok) {
      setRedirect(true);
      navigate(`/post/${id}`);
    }
  }

  
const handleUploadClick = () => {
  // Trigger the file input dialog when the button is clicked
  fileInputRef.current.click();
};

const handleFileUpload = (file) => {
  if (file) {
    // Read the selected file and create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilImage(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    // Reset the image preview when no file is selected
    setProfilImage(null);
  }
};

  return (
    <form 
    className='d-flex flex-column gap-2 bg-white'
    onSubmit={updatePost}
    >
    <input 
    type="title"
     placeholder={'Title'} 
     value={title}
     onChange={(e)=> {setTitle(e.target.value)}}
     />
    <input 
    type="summary" 
    placeholder={'Summary'}
    value={summary}
    onChange={(e)=> {setSummary(e.target.value)}}
    />

    <div className="category d-flex flex-column gap-2">
    {/* <input type="file" onChange={(e) => setFiles(e.target.files)} /> */}
    <div className="profile-image d-flex justify-content-center align-items-center">
              <div className="profile-picture-title mx-5">Add an image</div>
              <div
                className={`profile-upload-btn btn mx-5 me-5 ${
                  profilImage ? "hide" : "show"
                }`}
                onClick={handleUploadClick}
              >
                upload
              </div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFiles(e.target.files[0])}
              />
              {/* Display the image preview */}
              <label className="image-preview mx-5" htmlFor="fileInput">
                {profilImage && (
                  <div className="image-container">
                    <div className="image-overlay">
                      <img
                        src={profilImage}
                        alt="Preview"
                        className="image-fluid"
                      />
                      <div
                        className="change-picture"
                        onClick={handleUploadClick}
                      >
                        <FaCamera className="camera-icon" />
                        <span>Change Picture</span>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </label>
            </div>

        <select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
        >
          <option value="Html">HTML</option>
          <option value="Css">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="ReactJs">ReactJS</option>
          <option value="Books">Books</option>
          <option value="Jobs">Jobs</option>
        </select>
      </div>
    <PostEditor value={content} onChange={setContent} />
    <button style={{marginTop: '5px'}}>Edit Post</button>
      </form>
  );
}

export default EditPost;
 