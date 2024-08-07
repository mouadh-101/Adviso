import models from '../models/index.js'; // Adjust the path as necessary
import Blacklist from '../models/BlackLists.js';

const { User } = models;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @route POST /auth/register
 * @desc Registers a user
 * @access Public
 */
export async function Register(req, res) {
  const { fullName, email, password, role, phone, address, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: 'failed',
        message: 'It seems you already have an account, please log in instead.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      profilePicture,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        token,
      },
      message: 'Thank you for registering with us. Your account has been successfully created.',
    });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If not valid, return unauthorized response
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    // Generate JWT token
    const token = user.generateAccessJWT(); // Ensure this method exists in your User model

    // Cookie options
    const options = {
      maxAge: 20 * 60 * 1000, // Expires in 20 minutes
      httpOnly: true, // Cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Set to true only in production
      sameSite: 'None', // Use 'Lax' if 'None' causes issues
    };

    // Set the token in a cookie
    res.cookie("SessionID", token, options);

    // Return user info except password
    const { password: _, ...user_data } = user.toJSON();

    res.status(200).json({
      status: "success",
      data: [user_data],
      message: "You have successfully logged in.",
    });

  } catch (err) {
    console.error('Error during login:', err); // Log the error with details
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
}

export async function Logout(req, res) {
  try {
    const authHeader = req.headers['cookie']; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(';')[0];

    const decodedToken = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    const userId = decodedToken.id;

    const checkIfBlacklisted = await Blacklist.findOne({where :{ token: accessToken } }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const user=await User.findOne({where:{}})
    const newBlacklist = new Blacklist({
      token: accessToken,
      user_id: userId,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).json({ message: 'You are logged out!' });
  } catch (err) {
    console.error('Error during logout:', err); // Log the error with details
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
}