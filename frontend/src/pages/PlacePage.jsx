import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink.jsx';
import PlaceGallery from '../components/PlaceGallery.jsx';
import BookingWidget from '../components/BookingWidget.jsx';
import Spinner from '../components/Spinner.jsx';
import StarRateIcon from '@mui/icons-material/StarRate';
import ReactStars from 'react-rating-stars-component';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from 'framer-motion';
import { containerVariants } from '../components/Constants.jsx';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setLoading(true);

    const getPlace = async () => {
      const { data } = await axios.get(`/places/${id}`);
      setPlace(data.place);
      setLoading(false);
    };
    getPlace().then(() => {});

    const getReviews = async () => {
      const { data } = await axios.get(`/booking/${id}/review`);
      setReviews(data.reviews);

      if (data.reviews.length > 0) {
        const sum = data.reviews.reduce(
          (total, review) => total + review.rating,
          0
        );
        const average = sum / data.reviews.length;
        setAverageRating(average);
      } else {
        setAverageRating(0);
      }
    };

    Promise.all([getPlace(), getReviews()]).catch((error) => {
      console.error('Error:', error);
    });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }

  return (
    <motion.div
      className="mt-14 -mx-8 pt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="px-20">
        <h1 className="text-3xl font-semibold">{place.title}</h1>
        <AddressLink placeAddress={place.address} />
      </div>
      <div className="relative z-30">
        <PlaceGallery place={place} />
      </div>
      <div className="px-20 pt-10">
        <h1 className="text-3xl font-semibold">Forecasted weather</h1>
        <h1 className="text-3xl font-semibold my-4">Route Navigation</h1>
      </div>

      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[6fr_5fr]">
        <div className="pl-20">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{place.description}</p>
          </div>
          <p>
            {' '}
            <AccessTimeFilledIcon /> Check-in: {place.checkIn}h
          </p>
          <p>
            {' '}
            <AccessTimeFilledIcon /> Check-out: {place.checkOut}h
          </p>
          <p>
            {' '}
            <PeopleIcon /> Max number of guests: {place.maxGuests}
          </p>
          <div>
            <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
          </div>
          <div className="text-sm leading-5 mb-4 mt-2">
            <p>{place.extraInfo}</p>
          </div>
          <div>
            <h2 className="font-semibold text-2xl mt-4">Amenities</h2>
          </div>
          <div>
            <div className="text-sm leading-5 mb-4 mt-2">
              {place.perks.map((item) => (
                <p className="mx-auto" key={String(item)}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white px-8 py-8 border-t things">
        <div>
          <h2 className="font-semibold text-2xl mt-4 px-12">
            {averageRating.toFixed(1)}{' '}
            <StarRateIcon style={{ paddingBottom: '5px' }} /> {reviews.length}{' '}
            reviews
          </h2>
          <div
            className=" mb-4 mt-6 px-10"
            style={{ maxHeight: '500px', overflowY: 'auto' }}
          >
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <div className="bg-gray-100 p-4 mb-4" key={review._id}>
                    <div className="font-semibold text-xl text-gray-700">
                      {review.user.name}
                    </div>
                    <li key={review._id} className="text-sm leading-5">
                      <ReactStars
                        name={`rating-${review._id}`}
                        value={review.rating}
                        starCount={5}
                        size={20}
                        starColor="#ffb400"
                        emptyStarColor="#bbb"
                        edit={false}
                      />
                      <div className="font-semibold text-gray-700 pt-4">
                        {review.review}
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="px-2">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacePage;