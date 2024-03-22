const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const userFromToken = require('../utils/userFromToken');
const jwt = require('jsonwebtoken');

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
          message: 'email or password is incorrect',
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

exports.logout = async (req, res) => {
  res.cookie('token', '').json({
    message: 'logged out successfully!',
  });
};
