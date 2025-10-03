import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import connectDB from "../config/mongodb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const doctorsData = [
  {
    name: "Dr. Richard James",
    email: "richard@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc1.png",
  },
  {
    name: "Dr. Emily Larson",
    email: "emily@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc2.png",
  },
  {
    name: "Dr. Sarah Patel",
    email: "sarah@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc3.png",
  },
  {
    name: "Dr. Christopher Lee",
    email: "christopher@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc4.png",
  },
  {
    name: "Dr. Jennifer Garcia",
    email: "jennifer@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc5.png",
  },
  {
    name: "Dr. Andrew Williams",
    email: "andrew@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc6.png",
  },
  {
    name: "Dr. Christopher Davis",
    email: "davis@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc7.png",
  },
  {
    name: "Dr. Timothy White",
    email: "timothy@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc8.png",
  },
  {
    name: "Dr. Ava Mitchell",
    email: "ava@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc9.png",
  },
  {
    name: "Dr. Jeffrey King",
    email: "jeffrey@example.com",
    password: "password123",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc10.png",
  },
  {
    name: "Dr. Zoe Kelly",
    email: "zoe@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc11.png",
  },
  {
    name: "Dr. Patrick Harris",
    email: "patrick@example.com",
    password: "password123",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc12.png",
  },
  {
    name: "Dr. Chloe Evans",
    email: "chloe@example.com",
    password: "password123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc13.png",
  },
  {
    name: "Dr. Ryan Martinez",
    email: "ryan@example.com",
    password: "password123",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc14.png",
  },
  {
    name: "Dr. Amelia Hill",
    email: "amelia@example.com",
    password: "password123",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care...",
    available: true,
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    imageFile: "doc15.png",
  },
];

const seedDoctors = async () => {
  try {
    await connectDB();
    await doctorModel.deleteMany();

    const doctorsToInsert = [];

    for (const doc of doctorsData) {
      const imagePath = path.join(__dirname, "images", doc.imageFile);
      const uploadRes = await cloudinary.uploader.upload(imagePath, {
        folder: "doctors",
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(doc.password, salt);

      doctorsToInsert.push({
        ...doc,
        password: hashedPassword,
        image: uploadRes.secure_url,
        date: new Date(),
      });
    }

    await doctorModel.insertMany(doctorsToInsert);

    console.log("✅ Doctors seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
