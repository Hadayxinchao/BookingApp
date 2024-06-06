import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import Avatar from "react-avatar";
import { useState } from "react";
import { removeItemFromLocalStorage } from "../utils/index.js";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
export default function Header() {
  const { user } = useContext(UserContext);
  const [popup, setPopup] = useState(false);
  
  const handleSetPopup = () => {
    setPopup(!popup);
  };
  return (
    <header className="flex bg-white justify-between fixed w-full py-5 px-10 border-b border-b-gray-300 mb-8 z-40">
      <Link to={"/"} className="flex items-center gap-1">
        <img src="/airbnb.png" alt="logo" className="w-10 h-10" />
      </Link>

      <SearchBar />

      <button
        onClick={handleSetPopup}
        className="relative flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 "
      >
        {popup && <Popup user={user} />}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        {user ? (
          <Avatar name={user.name} className="rounded-full" size="28" />
        ) : (
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </button>
    </header>
  );
}

const Popup = ({ user }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function logout() {
    setUser(null);
    removeItemFromLocalStorage("token");
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <div className="absolute top-16 right-0 w-60 bg-white shadow-2xl rounded-md">
      {user ? (
        <div className="flex flex-col	">
          <Link
            to="/account"
            className="text-left py-4 px-6 hover:bg-gray-200 border-b border-gray-300"
          >
            Account
          </Link>
          <Link
            to="/account/bookings"
            className="text-left py-4 px-6 hover:bg-gray-200"
          >
            My Bookings
          </Link>
          <Link
            to="/account/places"
            className="text-left py-4 px-6 hover:bg-gray-200"
          >
            My Accommodations
          </Link>
          <button
            onClick={logout}
            className="text-left bg-white py-4 px-6 hover:bg-gray-200 border-t border-gray-300"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col	">
          <Link to="/login" className="text-left py-4 px-6 hover:bg-gray-200">
            Login
          </Link>
          <Link
            to="/register"
            className="text-left py-4 px-6 hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
