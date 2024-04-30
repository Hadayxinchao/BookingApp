import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import AccountNav from "../components/AccountNav.jsx";
import BookingDates from "../components/BookingDates.jsx";
import PlaceImg from "../components/PlaceImg.jsx";
import axios from "axios";
import PaymentIcon from "@mui/icons-material/Payment";
import { getItemFromLocalStorage } from "../utils/index.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants } from "../components/Constants.jsx";

const BookedPlacesPage = () => {
  const navigate = useNavigate();
  const token = getItemFromLocalStorage("token");
  const handleStartPlanning = () => {
    navigate("/");
  };
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axios.get("/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings().then(() => {});
  }, [token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-14"
    >
      <AccountNav />
      <div>
        {bookings.length > 0 ? (
          <>
            <h1 className="text-3xl font-semibold my-5 mx-8">Your bookings</h1>
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-row mx-8 bg-gray-100 my-5 rounded-2xl cursor-pointer hover:bg-gray-300 hover:scale-105 transition transform duration-200 ease-out place-card"
              >
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className="flex gap-4 rounded-2xl overflow-hidden w-full"
                >
                  <div className="w-72">
                    <PlaceImg place={booking.place} />
                  </div>
                  <div className="py-3 pr-3 grow">
                    <h2 className="text-xl darktxt">{booking.place.title}</h2>
                    <div className="text-xl">
                      <div className="flex gap-2 "></div>
                      <div className="text-xl">
                        <BookingDates
                          booking={booking}
                          className="items-center mb-2 mt-4  text-gray-600"
                        />

                        <div className="flex gap-1 items-center">
                          <PaymentIcon className="darktxt" />
                          <span className="text-2xl darktxt">
                            Total price: ${booking.price}
                          </span>
                        </div>

                        {booking?.status === "cancelled" && (
                          <div className="bg-red-500 text-white font-bold py-2 px-4 rounded w-40 text-center mt-2">
                            Cancelled
                          </div>
                        )}
                        {booking?.status === "pending" && (
                          <div className="bg-yellow-500 text-white font-bold py-2 px-4 rounded w-40 text-center mt-2">
                            Pending
                          </div>
                        )}
                        {booking?.status === "approved" && (
                          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded w-40 text-center mt-2">
                            Approved
                          </div>
                        )}
                        {booking?.status === "done" && (
                          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded w-40 text-center mt-2">
                            Done
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-5 mx-8">
              No bookings yet... <br /> Still don't know where to go? Let's chat
              to find out!
            </h1>
            <div className="mx-8">
              <p className="text-3xl font-semibold my-5">
                Time to dust off your bag!
              </p>
              <button
                className="font-semibold border px-4 py-2 rounded-lg hover:scale-105 transition bg-gray-100 hover:bg-gray-200 start-planning"
                onClick={handleStartPlanning}
              >
                Start planning
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookedPlacesPage;
