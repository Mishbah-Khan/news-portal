import authConfig from '../configs/auth.config.js';

export const validateUser = (req, res, next) => {
  const token = req.cookies['user-token'];

  const decodedToken = authConfig.decodeToken(token);

  if (decodedToken === null) {
    res.status(401).json({
      message: 'UNAUTHORIZED ACCESS - INVALID TOKEN',
    });
  } else {
    req.headers.email = decodedToken['email'];
    req.headers._id = decodedToken['id'];
    next();
  }
};
