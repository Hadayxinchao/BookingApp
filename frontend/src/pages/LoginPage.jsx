import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "../providers/UserContext";
import { toast } from 'react-toastify';
import { setItemsInLocalStorage } from '../utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser, user} = useContext(UserContext);

  // if(user) {
  //   toast.warning('You are already logged in');
  //   navigate('/');
  // }
  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/user/login', {email,password});
      setItemsInLocalStorage('token', data.token);
      setUser(data.user);
      toast.success('Login successful');
      navigate('/');
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="mt-20 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="Email"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="Password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary mt-2">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-blue-700" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}