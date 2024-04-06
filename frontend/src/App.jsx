import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Index from "./components/Index";
import Profile from "./components/Profile";
import PlacesPage from "./pages/PlacesPage";
import Place from "./components/Place";
import PlacesFormPage from "./pages/PlacesFormPage";
import Layout from './components/Layout';
import axios from "axios";
import {UserProvider} from "./providers/UserContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<Place />} />
      </Route>
    </Routes>
    </UserProvider>
  );
}

export default App;
