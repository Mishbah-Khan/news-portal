import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_CLUSTER = process.env.DB_CLUSTER;
    const DB_NAME = process.env.DB_NAME;

    const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

    let cached = global.mongoose;

    if (!cached) {
      cached = global.mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
      console.log(`✅ Using cached DB: ${cached.conn.connection.name}`);
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URI, {
        bufferCommands: false,
      });
    }

    const conn = await cached.promise;
    cached.conn = conn;

    console.log(`✅ DB Connected - Name: ${conn.connection.name}`);

    return conn;

  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error; // ❗ don't use process.exit in production
  }
};

export default connectDB;