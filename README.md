# Wonder Kids Preschool 🏫

A full-stack preschool management application built with React, Node.js, MongoDB, and Razorpay integration.

## 📁 Project Structure

```
wonder-kids-preschool/
├── Frontend/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS stylesheets
│   │   └── data/          # Static data
│   ├── package.json
│   └── vite.config.js
├── backend/               # Node.js Backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── middleware/       # Express middleware
│   ├── config/           # Configuration files
│   ├── server.js         # Main server file
│   └── package.json
├── package.json          # Root package.json with scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd wonder-kids-preschool
   npm run install:all
   ```

2. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your API keys and database URL

3. **Start MongoDB:**

   ```bash
   mongod
   ```

4. **Start the development servers:**

   ```bash
   # Terminal 1: Backend
   npm run start

   # Terminal 2: Frontend
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm start` - Start backend server
- `npm run install:all` - Install all dependencies

## 🎯 Features

- **Student Enrollment** - Online registration system
- **Payment Integration** - Razorpay payment gateway
- **Email Notifications** - Automated receipt emails
- **SMS Notifications** - Twilio SMS for confirmations
- **Franchise Management** - Franchise inquiry system
- **Contact Forms** - Customer inquiry handling
- **Admin Dashboard** - Enrollment and payment management

## 🗄️ Database Models

- **Contact** - Customer inquiries
- **Enrollment** - Student registrations
- **Franchise** - Franchise applications
- **Payment** - Payment records

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/wonderkids
PORT=5000

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password

TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth
TWILIO_PHONE=your_twilio_number
```

## 📧 Email Setup

1. Enable 2-Factor Authentication on Gmail
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 📱 SMS Setup

1. Create a Twilio account
2. Get your SID, Auth Token, and phone number
3. Add credentials to `.env`
4. Verify phone numbers for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
