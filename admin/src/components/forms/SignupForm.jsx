import React from 'react'
import './SigninForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Admin Singup</h1>
        <div className='input-box'>
          <input type="text" placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' required />
          <FaLock className='icon'/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Confirm Password' required />
          <FaLock className='icon'/>
        </div>

        <button type="submit">Sign Up</button>

        <div className='register-link'>
          <p>Already have an account? <button onClick={() => navigate('/signin')}>Go to Signin</button></p>
        </div>
      </form>
    </div>
  )
}

export default SignupForm