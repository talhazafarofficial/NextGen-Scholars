# NextGen Scholars

[Live Demo](https://nextgenscholars.vercel.app/)

## Overview
NextGen Scholars is a full-stack, responsive student portal designed to provide a seamless and secure digital experience for students. The platform enables students to interact with educational resources, manage their learning progress, and access course information in an organized environment.

## Features
- **User Authentication:** Secure registration and login system.
- **Course Exploration:** Browse, search, and view details of various educational courses and instructors.
- **Enrollment Management:** Enroll in courses, track progress, and manage enrollments.
- **Responsive Design:** Clean, modern UI that adapts to desktop, tablet, and mobile devices.
- **Admin Dashboard:** Manage students, courses, enrollments, and requests (for admins).

## Technologies Used
- **Frontend:** Next.js (App Router), React, HTML5, CSS3
- **Backend:** MongoDB (with Mongoose models), RESTful API routes (Next.js API routes)

## Folder Structure
- `app/` — Main application pages and routes (including authentication, dashboard, courses, admin, etc.)
- `components/` — Reusable UI components (Navbar, Footer, etc.)
- `lib/` — Utility functions and database connection logic
- `models/` — Mongoose models for MongoDB collections
- `public/` — Static assets (images, icons)
- `styles/` — Global and modular CSS files

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/talhazafarofficial/NextGen-Scholars
   cd nextgenscholars
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your MongoDB URI and JWT secret.
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Skills & Learning
- Full-Stack Web Development (MERN principles)
- Performance optimization and scalable system design
- User Interface and Experience Design
- Responsive and accessible web design

## License
This project is for educational purposes.
