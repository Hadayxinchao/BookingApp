import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import Spinner from "../components/Spinner.jsx";
import { getItemFromLocalStorage } from "../utils/index.js";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import { containerVariants } from "../components/Constants.jsx";
import { toast } from "react-toastify";
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("pending");
  const [bookingData, setBookingData] = useState([]);
  const handleChangeStatus = (id, status) => {
    axios
      .post(`/booking/change/${id}`, { status: status })
      .then((res) => {
        toast.success("Status changed successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      });
  };
  useEffect(() => {
    const token = getItemFromLocalStorage("token");
    const getMyBookings = async () => {
      try {
        const { data } = await axios.get("booking/owner/:id", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };
    const getPlaces = async () => {
      try {
        const { data } = await axios.get("places/user-places", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMyBookings().then(() => {});
    getPlaces().then(() => {});
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );
  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved"
  );
  const cancelledBooking = bookings.filter(
    (booking) => booking.status === "cancelled"
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-14"
    >
      <AccountNav />
      <div className="flex justify-between">
        <h1 className="text-2xl	">Đặt phòng/đặt chỗ của bạn</h1>
        <div className="font-bold underline underline-offset-1">
          Tất cả đặt phòng ({bookings.length})
        </div>
      </div>

      <div className="mt-4">
        <button
          className={`mr-6 bg-white border px-4 py-2 rounded-2xl ${
            status === "pending" ? "border-black border-2" : ""
          }`}
          onClick={() => {
            setStatus("pending");
            setBookingData(pendingBookings);
          }}
        >
          Pending ({pendingBookings.length})
        </button>
        <button
          className={`mr-6 bg-white border px-4 py-2 rounded-2xl ${
            status === "approved" ? "border-black border-2" : ""
          }`}
          onClick={() => {
            setStatus("approved");
            setBookingData(approvedBookings);
          }}
        >
          Approved ({approvedBookings.length})
        </button>
        <button
          className={`mr-6 bg-white border px-4 py-2 rounded-2xl ${
            status === "cancelled" ? "border-black border-2" : ""
          }`}
          onClick={() => {
            setStatus("cancelled");
            setBookingData(cancelledBooking);
          }}
        >
          Canceled ({cancelledBooking.length})
        </button>
      </div>

      {bookingData.length === 0 ? (
        <NoBooking />
      ) : (
        <div className="my-4 grid-cols-3 grid-flow-cols grid gap-4">
          {bookings
            .filter((booking) => booking.status === status)
            .map((booking) => (
              <div className="border p-4 rounded-2xl h-52">
                <div>{booking.place.title}</div>
                <div key={booking.id}>{booking.name}</div>
                <div>{booking.phone}</div>
                <div>{booking.checkIn}</div>
                <div> {booking.checkOut}</div>
                {booking.status === "pending" ? (
                  <div className="mt-2">
                    <button
                      className="p-2 rounded mr-6 bg-green-400"
                      onClick={() =>
                        handleChangeStatus(booking._id, "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="p-2 rounded bg-red-500"
                      onClick={() =>
                        handleChangeStatus(booking._id, "cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      )}

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary hover:bg-secondary transition mb-5 text-white py-2 px-6 rounded-full hover:scale-110 "
          to={"/account/places/new"}
        >
          <Add />
          Add new place
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <div className="" key={place._id}>
              <PlaceCard place={place} />
            </div>
          ))}
      </div>
    </motion.div>
  );
};

const NoBooking = () => {
  return (
    <div className="my-4 bg-gray-100 h-52 flex items-center justify-center rounded-xl">
      <div>Bạn không có khách nào trả phòng vào hôm nay hoặc ngày mai.</div>
    </div>
  );
};

export default PlacesPage;
