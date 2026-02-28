// validation.middleware.js
import authConfig from '../configs/auth.config.js';

export const validateUser = (req, res, next) => {
  try {
    let token = null;

    // Check cookie first
    if (req.cookies && req.cookies['user-token']) {
      token = req.cookies['user-token'];
    }

    // Check Authorization header as fallback
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided - UNAUTHORIZED ACCESS',
      });
    }

    const decodedToken = authConfig.decodeToken(token);

    if (decodedToken === null) {
      return res.status(401).json({
        success: false,
        message: 'UNAUTHORIZED ACCESS - INVALID TOKEN',
      });
    }

    req.headers.email = decodedToken['email'];
    req.headers._id = decodedToken['id'];
    req.user = {
      email: decodedToken['email'],
      _id: decodedToken['id'],
    };

    next();
  } catch (error) {
    console.error('Validation middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    });
  }
};
