const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userFromToken = require('../utils/userFromToken');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      let missingFields = [];
      if (!name) {
        missingFields.push('Name');
      }
      if (!email) {
        missingFields.push('Email');
      }
      if (!password) {
        missingFields.push('Password');
      }

      return res.status(400).json({
        message: `The following fields are required: ${missingFields.join(', ')}`,
      });
    }

    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        message: 'Email already registered',
      });
    }

    user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    res.status(200).json({
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      let missingFields = [];
      if (!email) {
        missingFields.push('Email');
      }
      if (!password) {
        missingFields.push('Password');
      }

      return res.status(400).json({
        message: `The following fields are required: ${missingFields.join(', ')}`,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days',
          }
        );

        user.password = undefined;

        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: 'Email or password is incorrect',
        });
      }
    } else {
      res.status(400).json({
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData) {
      const { name, email, telephone , address, profilePicture, role, _id } =
        await User.findById(userData.id);
      res.status(200).json({ name, email, telephone, address , profilePicture, role, _id });
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, telephone, address } = req.body;
    const userId = userFromToken(req).id;

    console.log(userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, telephone, address },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // It's a good practice to remove sensitive data before sending the response
    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Upload user profile picture
exports.profilePicture = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Airbnb/ProfilePicture',
        use_filename: true,
      });

      // Update the user's profile picture URL in the database
      user.profilePicture = result.secure_url;
      await user.save();

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { profilePicture: result.secure_url },
        { new: true },
      );

      // Respond with the profile picture URL
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({
        error,
        message: 'Internal server error',
      });
    }
  };
