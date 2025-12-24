import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  // Use the URI as-is; don't append paths that corrupt query params
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.
