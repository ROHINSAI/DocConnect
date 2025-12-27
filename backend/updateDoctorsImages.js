
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import doctorModel from './models/doctorModel.js';
import fs from 'fs';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
}


const personas = [
    {
        name: "Dr. Ananya Patel",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/dr_ananya_patel_1766829500108.png",
        speciality: "Dermatologist",
        about: "Dr. Ananya Patel is a highly skilled Dermatologist with over 10 years of experience in treating various skin conditions. She is dedicated to providing personalized care and helping patients achieve healthy, glowing skin."
    },
    {
        name: "Dr. Aarav Sharma",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/dr_aarav_sharma_1766829516043.png",
        speciality: "Gynecologist",
        about: "Dr. Aarav Sharma is a compassionate Gynecologist committed to women's health. With a focus on preventive care and patient education, he ensures that every patient feels comfortable and well-cared for."
    },
    {
        name: "Dr. Diya Gupta",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/dr_diya_gupta_1766829530852.png",
        speciality: "General physician",
        about: "Dr. Diya Gupta is a General Physician known for her thorough approach to diagnosis and treatment. She believes in holistic health and works closely with patients to manage chronic conditions and improve overall well-being."
    },
    {
        name: "Dr. Vihaan Singh",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/dr_vihaan_singh_1766829545399.png",
        speciality: "Neurologist",
        about: "Dr. Vihaan Singh is a leading Neurologist specializing in disorders of the nervous system. His expertise and empathetic nature make him a trusted choice for patients seeking advanced neurological care."
    },
    {
        name: "Dr. Zara Khan",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/doc_female_1_1766829147312.png",
        speciality: "Pediatrician",
        about: "Dr. Zara Khan is a friendly and experienced Pediatrician who loves working with children. She provides comprehensive care for infants, children, and adolescents, ensuring their healthy growth and development."
    },
    {
        name: "Dr. Arjun Rao",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/doc_male_1_1766829131545.png",
        speciality: "Gastroenterologist",
        about: "Dr. Arjun Rao is a Gastroenterologist with a reputation for excellence in treating digestive disorders. He utilizes the latest diagnostic techniques to provide accurate assessments and effective treatment plans."
    },
    {
        name: "Dr. Ishaan Verma",
        image: "/Users/rohinsaibhogadi/.gemini/antigravity/brain/fcf68318-87c0-4b6c-9442-6c5e2089f06f/doc_male_2_retry_1766829197337.png",
        speciality: "General physician",
        about: "Dr. Ishaan Verma is a dedicated General Physician with a focus on preventative medicine. He encourages healthy lifestyle changes and provides expert medical advice to help patients lead active and fulfilling lives."
    }
];

const updateDoctors = async () => {
    await connectDB();
    configureCloudinary();

    try {
        const doctors = await doctorModel.find({});
        console.log(`Found ${doctors.length} doctors.`);

        for (let i = 0; i < doctors.length; i++) {
            if (i >= personas.length) break; // Stop if we run out of personas

            const doc = doctors[i];
            const persona = personas[i];

            console.log(`Processing ${persona.name}...`);
            
            // Upload image
            try {
                // Check if image is already a URL (from previous run) or a path
                let newImageUrl = persona.image;
                if (!persona.image.startsWith('http')) {
                     const uploadResult = await cloudinary.uploader.upload(persona.image, { resource_type: 'image' });
                     newImageUrl = uploadResult.secure_url;
                }
                
                doc.name = persona.name;
                doc.about = persona.about;
                doc.speciality = persona.speciality; // Update speciality
                doc.image = newImageUrl;
                await doc.save();
                
                console.log(`Updated: ${doc.name} - ${doc.speciality}`);
            } catch (err) {
                 console.error(`Failed to upload/update for ${persona.name}:`, err);
            }
        }

        console.log("Doctors updated successfully.");

    } catch (error) {
        console.error("Error updating doctors:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

updateDoctors();
