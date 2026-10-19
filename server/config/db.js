import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn(
      '⚠️  [Database Warning] MONGODB_URI is not defined in environment variables.\n' +
      '   The server will operate in Fallback Data Mode using in-memory mock data.\n' +
      '   To connect to MongoDB Atlas, add MONGODB_URI to your .env file or hosting provider env variables.'
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [MongoDB Connected] Host: ${conn.connection.host} (${conn.connection.name})`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.warn('⚠️  Falling back to in-memory mock database mode so application remains functional.');
    return false;
  }
};

export const getDBStatus = () => {
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    state: isConnected ? 'connected' : 'fallback-mode',
    host: isConnected ? mongoose.connection.host : 'in-memory-fallback',
  };
};
