import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../components/AccountNav.jsx";
import Spinner from "../components/Spinner.jsx";
import { removeItemFromLocalStorage } from "../utils/index.js";
import { toast } from "react-toastify";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import { containerVariants } from "../components/Constants.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ProfilePage = () => {
  const { ready , user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [showForm, setShowForm] = useState(false);

  let { subpage } = useParams();

  if (!subpage) {
    subpage = "profile";
  }

  const logout = async () => {
    setUser(null);
    removeItemFromLocalStorage("token");
    toast.success("Logged out");
    setRedirect("/");
  };
  
  if (!ready) {
    return <Spinner />;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={String(redirect)} />;
  }

  const updateProfile = (name, email, telephone, address) => {
    axios
      .post(
        `/user/update/`,
        {
          name,
          email,
          telephone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        toast.success("Profile updated");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const uploadProfilePicture = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    axios
      .post(`/upload-profile-picture/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { url } = res.data;
        setUser((prevUser) => ({ ...prevUser, profilePicture: url }));
        toast.success("Profile picture updated");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const deleteProfilePicture = () => {
    axios
      .delete(`/user/delete-profile-picture/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser((prevUser) => ({ ...prevUser, profilePicture: null }));
        toast.success("Profile picture deleted");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  console.log(user);

  return (
    <div className="mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <AccountNav />
        {subpage === "profile" && (
          <div>
            <div className="text-center max-w-lg mx-auto">
              <div className="text-center">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    alt={user.name}
                    src={user.profilePicture}
                    sx={{ width: 150, height: 150, margin: "0 auto" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-profile-picture"
                    className="hidden"
                    onChange={uploadProfilePicture}
                  />
                  <button
                    onClick={() => {
                      document.getElementById("upload-profile-picture").click();
                    }}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={deleteProfilePicture}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      left: "0px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <p className="font-bold text-lg mt-4">
                  Logged in as {user.name} ({user.email})
                </p>
                <p className="mt-2">{user.description}</p>
              </div>
              <br />
            </div>

            <div className="max-w-lg mx-auto text-center">
              {!showForm ? (
                <button
                  className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                  onClick={toggleForm}
                >
                  Update Profile
                </button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: -50, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile(
                      e.target.name.value,
                      e.target.email.value,
                      e.target.telephone.value,
                      e.target.address.value
                    );
                  }}
                >
                  <h2 className="text-center text-2xl font-bold mb-4">
                    Update profile
                  </h2>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2 text-left"
                      htmlFor="name"
                    >
                      <p>Name</p>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                      id="name"
                      type="text"
                      placeholder="Name"
                      defaultValue={user.name}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2 text-left"
                      htmlFor="email"
                    >
                      <p>Email</p>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                      id="email"
                      type="email"
                      placeholder="Email"
                      defaultValue={user.email}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2 text-left"
                      htmlFor="telephone"
                    >
                      <p>Telephone</p>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                      id="telephone"
                      type="text"
                      placeholder="Telephone"
                      defaultValue={user.telephone}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2 text-left"
                      htmlFor="address"
                    >
                      <p>Address</p>
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                      id="address"
                      type="text"
                      placeholder="Address"
                      defaultValue={user.address}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-20">
                    <button
                      className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}

              <button
                className="primary max-w-sm mt-4 hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                onClick={logout}
              >
                <LoginOutlinedIcon className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
        {subpage === "places" && <PlacesPage />}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
