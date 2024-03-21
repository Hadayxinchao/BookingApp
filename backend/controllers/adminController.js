const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
// const userFromToken = require('../utils/userFromToken');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin)
    if (admin) {
      const validatedPassword = (password === admin.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { name: admin.name, email: admin.email, id: admin._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '2 days',
          }
        );

        admin.password = undefined;

        res.status(200).json({
          admin,
          token,
        });
      } else {
        res.status(401).json({
          message: 'name or password is incorrect',
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
