const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
  getPlaceReviews,
  createReview,
  deleteBooking,
  getMyBookings,
  changeBookingStatus
} = require('../controllers/bookingController');

router.route('/').get(getBookings).post(createBookings);
router.route('/:id/review').get(getPlaceReviews).post(createReview);
router.route('/cancel/:id').post(deleteBooking);
router.route('/owner/:id').get(getMyBookings);
router.route('/change/:id').post(changeBookingStatus);
module.exports = router;