import React, { useState } from 'react'
import './Footer.css'
import newsLetter from '../../images/newsletter.png'
import SubscribeComponent from '../Subscribe';
function Footer() {

  return (
    <>
      <footer className='py-4 mt-3'>
      <div className="container-xxl">
        <div className="row align-align-items-center">
          <div className="col-7">
            <div className="footer-top-data d-flex gap-30 align-items-center">
              <img src={newsLetter} alt='newsletter' className='mx-2'/>
              <h2 className='mb-0 text-white'>Sign Up for NewsLetter</h2>
            </div>
          </div>
          <div className="col-5">
       <SubscribeComponent />
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}

export default Footer
