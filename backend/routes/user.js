const express = require('express');
const router = express.Router();

const {
  register,
  login,
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
router.route('/upload-profile-picture/:id', upload.single('profilePicture')).post(profilePicture); */
router.route('/upload-by-link').post(uploadByLink);
router.route('/upload').post(uploadFromLocal);
router.route('/update').post(updateProfile);
module.exports = router;
