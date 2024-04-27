const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: './temp' });

dotenv.config();

router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/places', require('./place'));
router.use('/booking', require('./booking'));

router.post('/upload-by-link', async (req, res) => {
    try {
      const { link } = req.body;

      if(!link) {
        return res.status(400).json({
          message: 'Link is required'
        });
      }

      let result = await cloudinary.uploader.upload(link, {
        folder: 'Airbnb/Places',
      });

      res.json(result.secure_url);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  });
  
  // upload images from local device
  router.post('/upload', upload.array('photos', 100), async (req, res) => {
    try {
      let imageArray = [];
  
      for (let index = 0; index < req.files.length; index++) {
        let { path } = req.files[index];
        let result = await cloudinary.uploader.upload(path, {
          folder: 'Airbnb/Places',
        });
        imageArray.push(result.secure_url);
      }
      
      res.status(200).json(imageArray);
    } catch (error) {
      console.log('Error: ', error);
      res.status(500).json({
        error,
        message: 'Internal server error',
      });
    }
  });


module.exports = router;
