import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faList, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Register = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate()
  let [redirect, setRedirect] = useState(false);

  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] =  useState("");
  let [profilImage, setProfilImage] = useState("");

  let  [closedEye, setClosedEye] = useState(true);
  let [type, setType] = useState('password');

  let [mailError, setMailError] = useState(false);
  let [passError, setPassError] = useState(false);

  const handleClickClosedEye = (e) => {
    e.preventDefault();
    setClosedEye(false);
    setType("text");
  };

  const handleClickOpenedEye = (e) => {
    e.preventDefault();
    setClosedEye(true);
    setType("password");
  };



  async function handleClickSubmit(e) {
    if ((email !== '') && (email.includes("@")) && (email.includes("."))) {
      setMailError(false);
    } else {
      setMailError(true);
    }
  
    if ((password.length >= 8)) {
      setPassError(false);
    } else {
      setPassError(true);
    }
  
    if ((mailError == false) && (passError == false)) {
      e.preventDefault();
  
      const response = fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ userName, email, password }),
        headers: { 'Content-Type': "application/json" },
      });
  
      response.then(userInfo => {
        setRedirect(true);
        Swal.fire(
          'Good job!',
          'You Have registered! Login now',
          'success'
        )
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Try Again',
          text: error.message,
        })
      })
    }
  }
  
  const handleUploadClick = () => {
    // Trigger the file input dialog when the button is clicked
    fileInputRef.current.click();
  };

  const handleRedirect = () => {
    if (redirect) {
      navigate('/login');
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [redirect]);


 
  return (
    <>
      <div className="ground">
        <div className="one">
          <div className="left-side">
            <div className="icon">
            <FontAwesomeIcon icon={faUser}  className='fs-4' />
            </div>
           <h1 className="logo-header">Iheb</h1>
            <p>Join us now to get the latest technologies updates</p>
          </div>
        </div>
        <div className="two">
          <div className="right-side">
            <form  onSubmit={handleClickSubmit} className="login-form">
              <div className="title">Register</div>
             
                <div className="userName mt-0  ">
                <h3 className="mail">User Name</h3>
              <input 
              type="text" 
              name="userName" 
              placeholder="joe" 
              onChange={(e) => setUserName(e.target.value)}
              />
                </div>

              <h3 className="mail">Email</h3>
              <input 
              type="email" 
              name="email" 
              placeholder="joe@email.com" 
              onChange={(e) => setEmail(e.target.value)}
              />
              {mailError && (
              <p className="error email-error bg-danger-subtle">Please provide a valid email</p>
              )}
              

              <h3 className="mail">Password</h3>
              <input 
              type={type} 
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)}
              />
              
              
              <div className="eyes" name="eyes">
               { closedEye && (
                <div 
                className="closedEye" 
                >
                <FontAwesomeIcon icon={faEyeSlash} onClick={handleClickClosedEye} />
                </div>
                )}
                {!closedEye &&(
                <div className="closedEye">
                <FontAwesomeIcon icon={faEye}
                onClick={handleClickOpenedEye} />
                </div>
                )}
              </div>
              {passError && (
              <p className="error password-error bg-danger-subtle">Password is too short</p>
              )}
            
              <div className="btn">
                <input type="submit"  value="Register" />
                <Link to='/login' rel="noopener noreferrer" className="reg">Have an account? login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register
