import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SigninForm.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const SigninForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here

    // Redirect to the dashboard
    navigate('/dashboard');
  };

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

        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default SigninForm