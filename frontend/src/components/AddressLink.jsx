import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const AddressLink = ({ placeAddress, className = null }) => {
  if (!className) {
    className = 'my-3 block';
  }

  className += ' flex gap-1 font-semibold underline';
  return (
    <a
      className={className}
      href={`https://maps.google.com/?q=${placeAddress}`}
      target="blank"
    >
      <LocationOnOutlinedIcon />

      {placeAddress}
    </a>
  );
};

export default AddressLink;