import React, { useRef, useState } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom';
import PostEditor from '../../components/PostEditor';
import { FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Create() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Html');
  const [profilImage, setProfilImage] = useState('');

  const [redirect, setRedirect] = useState('false');

  async function createNewPost(e) {
    e.preventDefault();

    // Check if required fields are filled in
    if (!title || !summary || !content) {
      Swal.fire({
        icon: 'error',
        title: 'Try Again',
        text: 'You must fill all required fields!',
      });
      return;
    }

    const data = new FormData();
    const file = fileInputRef.current.files[0];

    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('category', category);
    data.set('file', file);

    const res = await fetch('https://blog-deploy-backend.onrender.com/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (res.ok) {
      setRedirect('true');
      navigate('/');
      Swal.fire('Good job!', 'Your post has been created!', 'success');
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append('file', file);

    const response = await fetch('https://blog-deploy-backend.onrender.com/upload', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      const result = await response.json();
      return result.fileUrl;
    } else {
      throw new Error('Failed to upload file');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilImage(null);
    }
  };

  return (
    <form className="d-flex flex-column gap-2 bg-white" onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />

      <div className="category d-flex flex-column gap-2">
        <div className="profile-image d-flex justify-content-center align-items-center">
          <div className="profile-picture-title mx-5">Add an image</div>
          <div
            className={`profile-upload-btn btn mx-5 me-5 ${
              profilImage ? 'hide' : 'show'
            }`}
            onClick={handleUploadClick}
          >
            upload
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
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
          </label>
        </div>

        <select
          onChange={(e) => {
            setCategory(e.target.value);
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
      <PostEditor
        value={content}
        onChange={setContent}
        handleFileUpload={handleFileUpload}
      />
      <button style={{ marginTop: '5px' }}>Create Post</button>
    </form>
  );
}

export default Create;
