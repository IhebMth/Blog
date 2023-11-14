import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';
import {  faUser, faList, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { UserContext } from '../../UserContext';


function Login() {

  const navigate = useNavigate(); // Initialize navigate function

  let [email, setEmail] = useState("")
  let [password, setPassword] =  useState("")
  let  [closedEye, setClosedEye] = useState(true)
  let [type, setType] = useState('password')

  let [mailError, setMailError] = useState(false)
  let [passError, setPassError] = useState(false)

  let [redirect, setRedirect] = useState(false)
  let {setUserInfo} = useContext(UserContext)
  
  const handleClickClosedEye = (e) => {
    e.preventDefault()
    setClosedEye(false)
    setType("text")
  }

  const handleClickOpenedEye = (e) => {
    e.preventDefault()
    setClosedEye(true)
    setType("password")
  }

  const handleRedirect = () => {
    if (redirect) {
      navigate('/');
    }
  };

  async function handleClickSubmit(e)  {
   e.preventDefault()

   const response = await fetch('http://localhost:4000/login', {
   method: 'POST',
   body: JSON.stringify({email, password}),
   headers: {'Content-Type':'application/json'},
   credentials: 'include', 
   })
   if (response.ok) {
    response.json().then(userInfo => {
     setUserInfo(userInfo) 
      setRedirect(true);
    })
    Swal.fire(
      'Good job!',
      'You Have Logged In!',
      'success'
    )
   }else 
   {
    Swal.fire({
      icon: 'error',
      title: 'Try Again',
      text: 'Your Email Or Password Is Wrong!',
    })
   }
  }
  
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
            <form action="/" onSubmit={handleClickSubmit} className="login-form" target="">
              <div className="title">Log in</div>

              <h3 className="mail">Email</h3>
              <input 
              type="email" 
              name="email" 
              placeholder="joe@email.com" 
              onChange={(e) => setEmail(e.target.value)}
              />
              {mailError && (
              <p className="error email-error bg-danger-subtle">Email does not exist</p>
              )}

              
              <h3 className="password">Password</h3>
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
              <p className="error password-error bg-danger-subtle">Password is wrong</p>
              )}
              <a href="http://facebook.com" target="_blank" rel="noopener noreferrer" className="resetPass">
                forgot password?
              </a>
              <div className="btn ">
                <input type="submit" onClick={handleClickSubmit} value="Login" />
                <Link to='/register'  rel="noopener noreferrer" className="reg">Register?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
