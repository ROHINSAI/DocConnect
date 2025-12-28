# DocConnect - Doctor Appointment Booking System

DocConnect is a comprehensive full-stack doctor appointment booking application. It provides distinct interfaces for Patients, Doctors, and Adminstrators, allowing for seamless appointment scheduling, management, and user interaction.

## Deployment Links

- **User Frontend:** [https://doc-connect-blush.vercel.app/](https://doc-connect-blush.vercel.app/)
- **Admin Panel:** [https://doc-connect-admin-zeta.vercel.app/](https://doc-connect-admin-zeta.vercel.app/)
- **Backend:** [https://doc-connect-backend.vercel.app/](https://doc-connect-backend.vercel.app/)

## Features

- **Pateint Interface:** Browse doctors, book appointments, view profile, and manage booked appointments.
- **Admin Panel:** Manage doctors, view all appointments, and handle system-wide settings.
- **Doctor Panel:** View assigned appointments, update profile, and manage availability.
- **Authentication:** Secure login for Admins, Doctors, and Patients.
- **Dark Mode:** Fully supported dark mode across the application.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Admin:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Credentials

### Installation

1.  **Clone the repository.**
2.  **Install dependencies** for Backend, Frontend, and Admin:
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    cd ../admin && npm install
    ```
3.  **Environment Variables:** Create `.env` files in `backend`, `frontend`, and `admin` directories with your credentials.

### Running Locally

1.  **Start Backend:**
    ```bash
    cd backend
    npm run server
    ```
2.  **Start Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
3.  **Start Admin:**
    ```bash
    cd admin
    npm run dev
    ```
