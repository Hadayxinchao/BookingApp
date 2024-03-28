import React from 'react'
import './SigninForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const navigate = useNavigate();

  return (
    <div className='wrapper'>
      <form action="">
        <h1>Admin Signin</h1>
        <div className='input-box'>
          <input type="text" placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' required />
          <FaLock className='icon'/>
        </div>

        <div className='remember-forgot'>
          <label><input type="checkbox" />Remmeber me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <div className='register-link'>
          <p>Don't have an account? <button onClick={() => navigate('/signup')}>Go to Signup</button></p>
        </div>
      </form>
    </div>
  )
}

export default SigninForm