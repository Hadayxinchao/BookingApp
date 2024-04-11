const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  profile,
  updateProfile,
  uploadByLink,
  uploadFromLocal,
  profilePicture,
} = require('../controllers/userController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(profile);
/* router.route('/updateProfile').post(updateProfile);
router.route('/upload', upload.array('photos', 100)).post(uploadFromLocal);
router.route('/upload-profile-picture/:id', upload.single('profilePicture')).post(profilePicture); */
router.route('/upload-by-link').post(uploadByLink);

module.exports = router;
