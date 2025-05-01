# Apollo 247 Clone - Doctor Listing Portal

This project is a functional clone of Apollo 247's doctor listing page, specifically focusing on replicating the General Physician & Internal Medicine specialty page. The application includes both a Next.js frontend and a custom REST API backend.

## Project Overview

This clone implements:
- A responsive doctor listing page matching Apollo 247's specialty page
- Functional doctor filters (specialty, city, gender, experience, etc.)
- Pagination functionality for doctor listings
- Two fully-functional REST APIs:
  - List doctors with filters
  - Add new doctors
- SEO optimization for improved search engine visibility

## Tech Stack

### Frontend
- **Next.js** - React framework with SSR capabilities
- **CSS Modules** - For component-scoped styling
- **Fetch API** - For making HTTP requests to the backend

### Backend
- **Express.js** - Node.js web application framework
- **MongoDB** - NoSQL database for storing doctor information
- **Mongoose** - MongoDB object modeling

## Project Structure

```
apollo-clone/
├── frontend/                    # Next.js frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── app/                 # Next.js app router
│   │   │   ├── specialties/
│   │   │   │   └── general-physician-internal-medicine/
│   │   │   │       └── page.js  # Main doctor listing page
│   │   │   ├── layout.js
│   │   │   └── page.js         
│   │   ├── components/          # Reusable components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.css
│   │   │   ├── DoctorCard/
│   │   │   │   ├── DoctorCard.jsx
│   │   │   │   └── DoctorCard.module.css
│   │   │   ├── Filters/
│   │   │   │   ├── Filters.jsx
│   │   │   │   └── Filters.module.css
│   │   │   └── Pagination/
│   │   │       ├── Pagination.jsx
│   │   │       └── Pagination.module.css
│   │   ├── services/            # API service functions
│   │   └── utils/               # Utility functions
│   ├── package.json
│   └── next.config.js
└── backend/                     # Express backend
    ├── src/
    │   ├── controllers/         # Request handlers
    │   │   └── doctor.controller.js
    │   ├── models/              # Database models
    │   │   └── doctor.model.js
    │   ├── routes/              # API routes
    │   │   └── doctor.routes.js
    │   ├── middlewares/         # Custom middlewares
    │   ├── utils/               # Utility functions
    │   └── index.js             # Main entry point
    ├── package.json
    └── .env                     # Environment variables
```

## Setup and Installation

### Prerequisites
- Node.js (v18.0.0 or later)
- npm or yarn
- MongoDB (local or Atlas connection)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd apollo-clone/backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/apollo-clone
   ```
4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd apollo-clone/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:3000

## API Documentation

### 1. List Doctors with Filters
- **Endpoint**: `GET /api/doctors`
- **Description**: Retrieves a paginated list of doctors with optional filters
- **Query Parameters**:
  - `specialty` (string) - Filter by medical specialty
  - `city` (string) - Filter by city
  - `gender` (string) - Filter by gender
  - `experience` (number) - Filter by minimum years of experience
  - `availability` (string) - Filter by availability (e.g., "today", "tomorrow")
  - `page` (number) - Page number for pagination
  - `limit` (number) - Number of results per page
- **Response**:
  ```json
  {
    "doctors": [...],
    "totalCount": 123,
    "currentPage": 1,
    "totalPages": 13
  }
  ```

### 2. Add Doctor
- **Endpoint**: `POST /api/doctors`
- **Description**: Adds a new doctor to the database
- **Request Body**:
  ```json
  {
    "name": "Dr. John Doe",
    "specialty": "General Physician",
    "experience": 15,
    "qualification": "MBBS, MD",
    "gender": "Male",
    "city": "Mumbai",
    "hospital": "Apollo Hospital",
    "availability": ["Monday", "Wednesday", "Friday"],
    "consultationFee": 800,
    "ratings": 4.5,
    "profileImage": "https://example.com/image.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "doctor": {...}
  }
  ```

## SEO Implementation

The project implements the following SEO optimizations:

1. **Next.js App Router** - Leveraging Next.js for server-side rendering to improve initial page load and SEO crawlability
2. **Metadata Configuration** - Proper meta tags for each page:
   - Title tags
   - Meta descriptions
   - Canonical URLs
3. **Structured Data** - Implementation of JSON-LD for doctor listings following schema.org standards
4. **Semantic HTML** - Using proper HTML elements for better accessibility and SEO
5. **Sitemap Generation** - Automatic sitemap generation for doctor listing pages
6. **Image Optimization** - Using Next.js Image component for better Core Web Vitals
7. **Performance Optimization** - Implementing best practices for loading speed

## Features Implemented

- **Doctor Listing** - Display of doctors with their details matching Apollo 247's design
- **Filtering System** - Interactive filters for:
  - Specialty
  - City/Location
  - Gender
  - Years of Experience
  - Availability
- **Pagination** - Server-side pagination for efficient data loading
- **Header** - Responsive header component matching Apollo 247's design
- **Mobile Responsiveness** - Fully responsive design adapting to various screen sizes

## Future Enhancements

- User authentication system
- Appointment booking functionality
- Doctor availability calendar
- Patient reviews and ratings
- Online consultation features

## Note About the Implementation

This project focuses specifically on the doctor listing page functionality as required. While the UI components like the header are present, they don't include full business logic (no click events) as per the assignment requirements.

## License

This project is created for educational and demonstration purposes only. It is not affiliated with Apollo 247.