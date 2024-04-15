import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  PlaceImg from './PlaceImg.jsx';
import { getItemFromLocalStorage } from '../utils/index.js';
import {toast} from 'react-toastify';

const PlaceCard = ({ place }) => {
  const [deleted, setDeleted] = useState(false); // Declare state variable and function
  const navigate = useNavigate();
  const deletePlace = async (id) => {
    try {
      await axios.delete(`/places/${id}`, {
        headers: {
          Authorization: `Bearer ${getItemFromLocalStorage('token')}`,
        },
      });
      setDeleted(true);
      toast.success('Place deleted successfully');
    } catch (err) {
      toast.error('Failed to delete place');
      console.error(err);
    }
  };

  const handleDelete = async (event) => {
    try {
      event.stopPropagation();
      await deletePlace(place._id);
      event.preventDefault();
    } catch (err) {
      console.error(err);
      alert('Failed to delete place');
    }
  };

  const handleUpdate = () => {
    navigate(`/account/places/${place._id}`);
  };

  if (!place || deleted) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col ml-2">
        <h2 className="text-lg font-bold">{place.title}</h2>
        {/* <p className="text-sm my-2">{place.description}</p> */}
      </div>
      <div className="flex mt-2">
        <PlaceImg place={place} />
      </div>

      <div className="flex mt-4 items-center justify-center">
        <button
          className="bg-primary rounded-2xl text-white hover:scale-110 hover:bg-secondary transition w-1/3 p-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className="mx-4"></div>
        <button
          className="bg-primary rounded-2xl text-white hover:scale-110 hover:bg-secondary transition w-1/3 p-2"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default PlaceCard;