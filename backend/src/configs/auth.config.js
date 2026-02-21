import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const encodeToken = (email, id) => {
  const payload = { email, id };
  const key = process.env.JWT_SECRET;
  const expire = process.env.JWT_EXPIRES_IN;

  return jwt.sign(payload, key, { expiresIn: expire });
};

const decodeToken = (token) => {
  try {
    const key = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (error) {
    return null;
  }
};

const JWTConfig = {
  encodeToken,
  decodeToken,
};
export default JWTConfig;
