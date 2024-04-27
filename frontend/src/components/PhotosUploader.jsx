import React, { useState } from 'react';
import axios from 'axios';
import {
  DeleteOutline,
  DriveFolderUpload,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import {toast} from 'react-toastify';
import Spinner from "../components/Spinner";

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setphotoLink] = useState('');
  const [loading, setLoading] = useState(false);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: filename } = await axios.post('/upload-by-link', {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
      setphotoLink('');
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if(loading) {
    return <Spinner />;
  }

  const uploadPhoto = async (e) => {
    console.log("Upload Photo");
    setLoading(true);
    try {
      const files = e.target.files;

      const data = new FormData(); 
      for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i]);
      }

      const { data: filenames } = await axios.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data'},
      });
      
      setAddedPhotos((prev) => {
        return [...prev, ...filenames];
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();

    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  };

  return (
    <>
      <div className="flex gap-3">
        <input
          id="photoLink"
          value={photoLink}
          onChange={(e) => setphotoLink(e.target.value)}
          type="text"
          placeholder="Add image link here or upload from your device"
        />
        <button
          className="bg-primary hover:bg-secondary hover:scale-105 transition text-white px-4 my-2 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((link) => (
            <div className=" flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt=""
              />
              <button
                onClick={() => removePhoto(link)}
                className="absolute cursor-pointer bottom-3 right-3 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
              >
                <DeleteOutline />
              </button>
              <button
                onClick={(e) => selectAsMainPhoto(e, link)}
                className="absolute cursor-pointer bottom-3 left-3 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
              >
                {link === addedPhotos[0] && <Favorite />}
                {link !== addedPhotos[0] && <FavoriteBorder />}
              </button>
            </div>
          ))}
        <label className="flex h-24 w-35 cursor-pointer justify-center items-center gap-1 border bg-transparent rounded-2xl p-2 text-xl text-gray-600 upload hover:scale-105 transition">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <div style={{ textAlign: 'center' }}>
            <DriveFolderUpload className="upload" />
            <p>Upload</p>
          </div>
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;