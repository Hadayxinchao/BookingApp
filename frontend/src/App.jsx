import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './Layout';
 import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
 axios.defaults.baseURL = 'http://localhost:4000/';
 axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
