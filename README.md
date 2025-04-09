# Library-System-Frontend Repo

This frontend repository is part of the Learner's Library project, a comprehensive library management system designed as part of the Enterprise Software Engineering (ESE) module at Ada. This README provides an overview of the project's features, installation instructions, and known issues.

## Project Name: Learner's Library - Library Management System

## Table of Contents

- [Introduction](#introduction)
- [Installation & Usage Instructions](#installation--usage-instructions)
- [Prerequisites](#prerequisites)
- [Setup Steps](#setup-steps)
- [Project Aim & Objectives](#project-aim--objectives)
- [Enterprise Considerations](#enterprise-considerations)
- [Performance](#performance)
- [Scalability](#scalability)
- [Robustness](#robustness)
- [Security](#security)
- [Deployment](#deployment)
- [Implemented Features](#implemented-features)
- [System Overview](#system-overview)
- [Known Issues & Future Enhancements](#known-issues--future-enhancements)

## Introduction

### Solution Overview

Learner's Library is a modern, web-based library management system built with Next.js. This system provides a seamless experience for both students and librarians. The application enables users to browse, borrow, and manage books while giving librarians tools to add books to the system, oversee the library's collection and latest user activities.

## Installation & Usage Instructions

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Supabase account for database and authentication
- ImageKit account for image management (optional)
- Backend codebase for Supabase edge-functions.

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ilie207/Library-System-Frontend.git
   cd library-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_IMAGEKIT_KEY=your_imagekit_public_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

4. **Running the application**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Project Aim & Objectives

**Main Goal:** Create an intuitive and efficient library management system that simplifies book borrowing and administration processes.

**Key Objectives:**

1. Implement secure user authentication with role-based access control
2. Provide a responsive and intuitive user interface for browsing and borrowing books
3. Enable librarians to manage book inventory and track borrowing activities
4. Ensure data integrity and security throughout the application
5. Create a scalable architecture that can grow with increasing users and books

## Enterprise Considerations

### Performance

- Server-side rendering with Next.js for faster initial page loads
- Optimised image handling using ImageKit for efficient delivery
- Minimised client-side JavaScript for better performance on low-end devices
- Data fetching via deployed edge-functions

### Scalability

- Codebase and component structure designed for easy feature expansion
- Separation of concerns between UI components and data fetching
- Serverless API routes, which can scale automatically based on demand
- Database design that accommodates growth in users and book inventory

### Robustness

- Comprehensive error handling throughout the application
- Fallback UI states for loading and error conditions
- Data validation on both client and server sides

### Security

- JWT-based authentication using Supabase Auth
- CSRF protection for all state-changing operations
- Input sanitisation to prevent XSS attacks
- Secure environment variable management
- Role-based access control for different user types (students vs. librarians)

### Deployment

- Supabase for database and authentication services
- Edge functions on Supabase for serverless API capabilities
- ImageKit for image storage and optimisation
- Deployment on Render for the frontend application

## Implemented Features:

- Search functionality for books
- User authentication and role-based access control
- Books borrowing for students
- Book management for librarians (add, update, delete)
- Statistics and analytics for librarians
- Overview of recent activities for librarians

## System Overview

### Authentication System

- **Purpose:** Secure user login and registration with role-based access
- **Location:** `app/components/Login.js`, `app/components/Signup.js`, `lib/AuthContext.js`
- **Key Components:** AuthProvider context, Login/Signup forms, ProtectedRoute component

### Book Browsing and Search

- **Purpose:** Allow users to discover books through browsing and searching
- **Location:** `app/components/BookList.js`, `app/components/SearchBar.js`
- **Key Components:** Book cards, filtering mechanisms, search functionality

### Book Borrowing System

- **Purpose:** Enable users to borrow books and track their borrowed items
- **Location:** `app/components/BorrowBook.js`, `app/api/borrowed-books/route.js`
- **Key Components:** Borrow button, availability checking, borrowing history

### Librarian Dashboard

- **Purpose:** Provide librarians with tools to manage books and monitor activities
- **Location:** `app/librarian-dashboard/`
- **Key Components:** Book management interface, user activity tracking, library stats

### Student Dashboard

- **Purpose:** Allow users to view and borrow books online
- **Location:** `app/student-dashboard/`
- **Key Components:** Book borrowing, book browsing

## Known Issues & Future Enhancements

### Known Issues

- Limited mobile responsiveness in some dashboard views
- Currently anyone is able to sign up for a student account

### Future Enhancements

- Add email notifications for due dates and borrow confirmation
- Implement book recommendations based on borrowing history
- Integrate with external book databases for richer metadata
- Create a more comprehensive reporting system for librarians
- Develop a fine management system for overdue books
- Implement a book reservation feature for unavailable books

---

This project was built with [Next.js](https://nextjs.org/) and uses [Supabase](https://supabase.io/) for backend services.
