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

Learner's Library is a modern, web-based library management system, which I have built with the use of Next.js framework. This system provides a seamless experience for both students and librarians. The application was developed to enable students to browse, search, and borrow books from the library in a modern and easy way. The application will also enable librarians to manage the library's inventory, by allowing them to add books to the system, as well as edit, and delete them. In addition to that the librarins will be able to oversee the library's collection, the statistics of the library and latest user activities such as book returns and book borrows.

## Installation & Usage Instructions

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager
- Supabase account for database and authentication
- ImageKit account for image management
- Backend codebase for Supabase edge-functions. [Use the following backend repository.](https://github.com/ilie207/Library-System-Backend)

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

**Main Goal:** Create an intuitive and efficient library management system that simplifies book borrowing and administration processes, for both students and librarians.

**Key Objectives:**

1. Implement secure user authentication with role-based access control (students vs. librarians)
2. Provide a responsive and intuitive user interface for browsing and borrowing books
3. Enable librarians to manage book inventory and track borrowing activities
4. Implement search functionallity for books
5. Ensure data integrity and security throughout the application
6. Create a scalable architecture that can grow with increasing users and books

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
- Data validation on both [client side](./library-system/app/components/Signup.js) and [server side](./library-system/lib/sanitise.js)
- [CI/CD pipeline](.github/workflows/next.js.yml) for automated testing

### Security

- [JWT-based](https://supabase.com/docs/guides/auth/sessions) authentication using Supabase Auth
- [CSRF protection](./library-system/lib/csrf.js) for all state-changing operations [PUT, POST, DELETE]
- [Input sanitisation](./library-system/lib/sanitise.js) to prevent XSS attacks
- Secure environment variable management
- Role-based access control for different user types (students vs. librarians)

### Deployment

- Supabase for database and authentication services
- Edge functions on Supabase for serverless API capabilities
- ImageKit for image storage and optimisation
- Deployment on Render for the frontend application

## Implemented Features:

- Search functionality for books, this allows users to find books they are interested in based on the book title, author, or genre.
- User authentication and role-based access control, this ensures that only authorized users can access certain features and data.
- Books borrowing for students, this allows students to borrow available books from the library.
- Book management for librarians (add, update, delete), this allows librarians to manage the book inventory, including adding new books, updating existing books, and deleting books that are no longer available.
- Statistics and analytics for librarians, this provides librarians with insights into the total amount of books within the library, books availability, amount of borrowed books, and pending returns.
- Overview of recent activities for librarians, this provides librarians with a quick overview of recent activities, such as book returns, and book reservations.

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

- Add email notifications for due dates and borrow confirmation, to improve user engagement and communication.
- Implement user account management and profile settings, to allow users to update personal information, and change passwords.
- Implement book recommendations based on borrowing history, this will help users discover new books based on their reading preferences.
- Integrate with external book databases for richer metadata, this will help students find books more easily.
- Create a more comprehensive reporting system for librarians, to provide more detailed insights into library usage and book circulation, as well as new book additions or book removals.
- Develop a fine management system for overdue books, to encourage timely returns and manage overdue fees.
- Implement a book reservation feature for unavailable books, this will allow users to reserve books that are currently fully borrowed.

---

This project was built with [Next.js](https://nextjs.org/) and uses [Supabase](https://supabase.io/) for backend services.
