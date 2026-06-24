# 🏆 QuickCourt -- Local Sports Facility Booking Platform

A full-stack **MERN** web application where users can book local sports
facilities, join matches, manage courts, handle payments, and monitor
bookings with role-based dashboards.

------------------------------------------------------------------------

## 🚀 Demo Login

    Username: adam07
    Password: 1234

------------------------------------------------------------------------

## 📌 Table of Contents

-   Features
-   Tech Stack
-   Folder Structure
-   Installation
-   Environment Variables
-   Running the Project
-   License

------------------------------------------------------------------------

# ⭐ Features

## 👤 User Features

-   Signup, login, OTP verification
-   Search venues by sport, price, location
-   Venue details with photos & amenities
-   Court booking with time slots
-   Razorpay simulated payment
-   View/Cancel bookings
-   Update profile

------------------------------------------------------------------------

## 🏟️ Facility Owner Features

-   Dashboard with analytics
-   Manage facilities and courts
-   Time slot management
-   View bookings
-   Earnings simulation

------------------------------------------------------------------------

## 🛡️ Admin Features

-   Approve/Reject facility registrations
-   Manage users
-   View global statistics
-   Booking & user trends

------------------------------------------------------------------------

# 🛠️ Tech Stack

### Frontend

-   React + Vite
-   Tailwind CSS
-   Redux Toolkit
-   Axios
-   EmailJS
-   Cloudinary
-   Google Maps API

### Backend

-   Node.js
-   Express
-   MongoDB
-   JWT
-   Cloudinary
-   Twilio
-   Razorpay

------------------------------------------------------------------------

# 📂 Folder Structure

    QuickCourt/
    │── backend/
    │── frontend/
    │── README.md

------------------------------------------------------------------------

# ⚙️ Installation

### Clone Project

``` bash
git clone https://github.com/yourusername/quickcourt.git
cd quickcourt
```

------------------------------------------------------------------------

# 🔐 Environment Variables

### 📌 Backend `.env`

    DBurl=
    PORT=3000
    JWTsecretKey=
    TWILIO_AUTH_TOKEN=""
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    RAZORPAY_KEY_ID=
    RAZORPAY_KEY_SECRET=

### 📌 Frontend `.env`

    VITE_GEO_DB_APIKEY=
    VITE_CLOUD_NAME=
    VITE_CLOUD_APIKEY=""
    VITE_CLOUD_APIKEY_SECRET=""
    VITE_CLOUD_UPLOAD_PRESET_NAME=""
    VITE_EMAILJS_SERVICE_ID=""
    VITE_EMAILJS_TEMPLATE_ID=""
    VITE_EMAILJS_PUBLIC_KEY=""
    VITE_GOOGLE_MAPS_API_KEY=""

------------------------------------------------------------------------

# ▶️ Running the Project

### Backend

``` bash
cd backend
npm install
npm start
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------


------------------------------------------------------------------------

# 📝 License

This project is for educational and portfolio use.
