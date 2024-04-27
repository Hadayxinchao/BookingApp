const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');
const Review = require('../models/Review');

exports.createBookings = async (req, res) => {
  try {
    const userData = userFromToken(req);

    if (!userData) { 
      return res.status(401).json({ message: 'Please login first' });
    }

    const infoData = req.body;

    const existingBooking = await Booking.findOne({
    place: infoData.place,
     $or: [
        { checkIn: { $gte: infoData.checkIn, $lt: infoData.checkOut } },
        { checkOut: { $gt: infoData.checkIn, $lte: infoData.checkOut } },
        { $and: [
          { checkIn: { $lt: infoData.checkIn } },
          { checkOut: { $gt: infoData.checkOut } }
        ] }
    ],
  });

    if (existingBooking) {
      return res.status(400).json({ message: 'Cannot create overlapping bookings' });
    }
    
    const booking = await Booking.create({
      user: userData.id,
      place: infoData.place,
      checkIn: infoData.checkIn,
      checkOut: infoData.checkOut,
      numOfGuests: infoData.numberOfGuests,
      name: infoData.name,
      phone: infoData.phone,
      price: infoData.price,
    });

    res.status(200).json({
      booking,
    });

  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }
    const data = await Booking.find({ user: userData.id }).populate('place');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    if (booking['user'].toString() !== userData.id) {
      return res.status(401).json({
        message: 'You are not authorized to delete this booking',
      });
    }

    await booking.remove();
    res.status(200).json({
      message: 'Booking deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const bookingId = req.body.bookingId;
    // Check if the booking exists and retrieve the check-out date
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, error: 'Booking not found' });
    }
    // Check if review or rating is missing
    if (!req.body.review || !req.body.rating) {
      return res.status(400).json({
        success: false,
        error: 'Review and rating are required',
      });
    }

    /* // Check if the review date is after the check-out date
    const reviewDate = new Date();
    if (reviewDate <= booking.checkOut) {
      return res
        .status(400)
        .json({ success: false, error: 'Cannot review before check-out' });
    }*/

    // Check if a review for this booking ID already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(409).json({
        success: false,
        error: 'You have already reviewed this booking',
      });
    } 
    const reviewData = {
      user: userData.id,
      place: req.body.placeId,
      booking: bookingId,
      rating: req.body.rating,
      review: req.body.review,
    };
    const newReview = await Review.create(reviewData);
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPlaceReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ place: id }).populate('user', 'name');

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};