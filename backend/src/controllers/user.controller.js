import JWTConfig from '../configs/auth.config.js';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';

//REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // 2️⃣ Save user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'USER REGISTERED SUCCESSFULLY',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'USER REGISTER FAILED',
      error: error.message,
    });
  }
};

//LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    // 1 Get email and password from request body
    console.log(req.body);
    const { email, password } = req.body;
    console.log(req.body);

    // 2 Find if the user is in Database
    const user = await User.findOne({ email });

    // 3 User is not in Database: throw error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'FAILED TO LOGIN: INVALID CREDENTIALS',
      });
    }

    // 4 User in Database: Check Password
    const isMatch = await bcrypt.compare(password, user?.password);

    // 5 Password did not match: throw error
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'FAILED TO LOGIN: PASSWORD INVALID ',
      });
    } else {
      // 6 Password matched -> Generate JWT Token
      const token = JWTConfig.encodeToken(user?.email, user?._id?.toString());

      // 7 Store the token in cookie
      res.cookie('user-token', token);

      // 8 Return response to the Frontend
      res.status(200).json({
        success: true,
        message: 'USER LOGIN SUCCESSFUL',
        user: {
          id: user?._id,
          email: user?.email,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'USER LOGIN FAILED',
      error: error.message,
    });
  }
};

//LOGOUT CONTROLLER
const logout = async (req, res) => {
  try {
    const token = req.cookies['user-token'];

    // If user is not logged in
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'USER IS NOT LOGGED IN',
      });
    }

    // Clear cookie if logged in
    res.clearCookie('user-token', {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'USER LOGOUT SUCCESSFUL',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'USER LOGOUT FAILED',
      error: error.message,
    });
  }
};

const UserController = {
  register,
  login,
  logout,
};

export default UserController;
