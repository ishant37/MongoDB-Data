import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/school");
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
