import React, { useContext, useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {UserContext} from '../providers/UserContext';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { getItemFromLocalStorage } from '../utils';
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(0);
  const [bookingId, setBookingId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { user } = useContext(UserContext);
  const token = getItemFromLocalStorage("token");

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(
      new Date(String(checkOut)),
       new Date(String(checkIn))
    );
  }
  const handleBooking = async () => {
    console.log('Booking');
    if (checkIn === null || checkOut === null) {
      toast.error('Check-in & check-out time is required');
      return;
    }
    if (name === null || name.match(/^ *$/) !== null) {
      toast.error('Name is required');
      return;
    }
    if (
      phone === null ||
      phone === '' ||
      phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) === null
    ) {
      toast.error('Phone is required (10 numbers)');
      return;
    }
    if (numOfGuests > place.maxGuests) {
      toast.error(`Max guests allowed is ${place.maxGuests}`);
      return;
    }
    if (numOfGuests < 1){
      toast.error(`Min guests allowed is 1`);
      return;
    }
    const infoData = {
      user: user['_id'],
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      place: place._id,
      price: place.price * numberOfNights,
      title: place.title,
      photo: place.photos[0],
    };

    try {
      await axios.post('/booking', {
        checkIn,
        checkOut,
        numberOfGuests: numOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response here if needed
      // For example, show a success message
      toast.success('Booking successful!');
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
    
    const stripePromise = loadStripe(
      'pk_test_51PWKpn05uRuhkBCEiU9bX67NtY48iqqoBut476i3AcSxPALSoGxqI9LE2MgbczGrUoBf1x7QcuL0NatZMD4jw5tN00EgQWoXnX'
    );
    const stripe = await stripePromise;
    const { data } = await axios.post('/payment/create', {
      infoData,
    });
    // Redirect to Stripe checkout
    await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl mr-20 shadow-3xl form input-bookings">
      <div className="text-xl text-center price">
        <div className="price">Price: ${place.price} per night</div>
      </div>
      <Stack spacing={2} mt={2} px={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns} className="px-2">
          <DatePicker
            label="Check-in"
            value={checkIn}
            onChange={(newValue) => {
              setCheckIn(newValue);
            }}
            textField={(params) => <TextField {...params} />}
            format="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={
              checkOut ? new Date(String(checkOut)) : new Date('2099-12-31')
            }
          />
          <DatePicker
            label="Check-out"
            value={checkOut}
            onChange={(newValue) => {
              setCheckOut(newValue);
            }}
            textField={(params) => <TextField {...params} />}
            format="dd/MM/yyyy"
            minDate={checkIn ? new Date(String(checkIn)) : new Date()}
          />
        </LocalizationProvider>
        <div className="pt-3 pb-1;">
          <TextField
            label="Number of guest"
            variant="outlined"
            type="number"
            value={numOfGuests}
            onChange={(e) => {
              setNumOfGuests(Number(e.target.value));
            }}
            style={{ width: '100%', padding: '0px' }}
            InputProps={{
              inputProps: {
                min: 1,
                max: place.maxGuests,
              },
            }}
          />
        </div>
        {numberOfNights > 0 && (
          <div>
            <div className="pt-4 pb-4">
              <TextField
                label="Your full name"
                variant="outlined"
                type="text"
                style={{ width: '100%', padding: '0px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Phone number"
                variant="outlined"
                type="tel"
                style={{ width: '100%', padding: '0px' }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}
      </Stack>
      <div className="my-4 mx-20">
        <button
          onClick={handleBooking}
          className="primary hover:bg-secondary transition hover:scale-110 transform duration-200 ease-out"
        >
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;