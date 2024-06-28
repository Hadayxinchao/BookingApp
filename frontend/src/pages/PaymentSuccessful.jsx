import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getItemFromLocalStorage } from '../utils';
import emailjs from '@emailjs/browser';
import { differenceInCalendarDays } from 'date-fns';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { containerVariants } from '../components/Constants.jsx';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function PaymentSuccessful() {
  const [bookings, setBookings] = useState([]);
  const [canSendMail, setCanSendMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const navigate = useNavigate();
  const token = getItemFromLocalStorage('token');

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
      const getBookings = async () => {
        try {
          const { data } = await axios.get('/booking', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBookings(data);
          if(bookings && bookings.length > 0) {
            await axios.post(`/booking/change/${bookings[bookings.length - 1]._id}`, { status: "Paid" })
            .catch((error) => {
              toast.error("Something went wrong");
              console.error(error);
            });
          }
          } catch (error) {
          console.log('Failed to fetch bookings');
        }
      };
      getBookings();
  }, [bookings, token]);

  return (
    <>
      <motion.div
        className="flex justify-center items-center h-full my-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className="w-1/2 text-center shadow-3xl rounded-2xl p-8"
          style={{ minWidth: '700px' }}
        >
          <div className="">
            <CheckCircleRoundedIcon
              style={{ color: '#FF5A5F', fontSize: '64' }}
            />
            <p className="font-semibold text-4xl pt-4">Payment Successful</p>
            <p className="font-semibold text-2xl mt-4">
              Your transaction has been successfully processed.
            </p>
            {bookings && bookings[bookings.length - 1] && (
              <div className="text-xl pt-3">
                <p className="font-semibold text-3xl">Total payment</p>
                <p className="text-5xl font-semibold mt-3">
                  ${bookings[bookings.length - 1].price}
                </p>
                <p className="font-semibold pt-4">
                  Booking ID: {bookings[bookings.length - 1]._id}
                </p>
                <p className="pt-6 text-justify">
                  Remember, your booking ID is unique to your reservation, and
                  it acts as proof of your payment and booking confirmation.
                  Having it readily available will save you time and ensure a
                  seamless experience in case you need to make any changes or
                  inquiries in the future.
                </p>
                <p className="py-3 text-justify">
                  In the event that you misplace or forget your booking ID,
                  don't worry! Our customer support team is here to assist you.
                </p>
              </div>
            )}
            <button
              className="primary hover:bg-secondary transition my-4 hover:scale-105 transform"
              onClick={handleClick}
              style={{ width: '200px' }}
            >
              Home
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default PaymentSuccessful;