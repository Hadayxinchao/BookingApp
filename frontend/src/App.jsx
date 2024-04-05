import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Index from "./components/Index";
import Profile from "./components/Profile";
import Places from "./components/Places";
import Place from "./components/Place";
import PlacesForm from "./components/PlacesForm";
import Layout from './Layout';
import axios from "axios";
require('dotenv').config();

console.log(process.env.REACT_APP_API_BASE_URL);
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account/places" element={<Places />} />
        <Route path="/account/places/new" element={<PlacesForm />} />
        <Route path="/account/places/:id" element={<PlacesForm />} />
        <Route path="/place/:id" element={<Place />} />
      </Route>
    </Routes>
  );
}

export default App;
