# Task Management System

This project is a full-stack Task Management System where users can register, log in, and manage their tasks (create, read, update, delete). The system includes a Node.js + TypeScript backend using Express and a React + TypeScript frontend.

## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Task Management**: Create, read, update, delete tasks. Mark tasks as completed.
- **Responsive Frontend**: A React-based frontend with responsive design (for mobile and desktop).
- **Backend API**: CRUD endpoints for tasks with proper validation and error handling.
- **Database**: SQL database (PostgreSQL or MySQL) to store users and tasks. Schema includes proper relations and indexes.

## Setup Instructions

### Backend Setup

1. **Clone the Repository and Navigate to the Backend Directory**

   ```bash
   git clone <repository_url>
   cd task-manager/task-manager-backend
2. **Install Dependencies**

   ```bash
   npm install
3. **Create a .env file in the backend directory with the following content (replace placeholders with your actual secrets and Database values):**

   ```bash
   JWT_SECRET=
   JWT_REFRESH_SECRET=
   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASS=
   DB_NAME=
4. **Ensure you have PostgreSQL (or MySQL) installed and running with these tables.**
   ```bash

   CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) NOT NULL UNIQUE,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );


   CREATE TABLE tasks (
   id SERIAL PRIMARY KEY,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   title VARCHAR(100) NOT NULL,
   description TEXT,
   status VARCHAR(20) DEFAULT 'pending',
   due_date DATE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
5. **Run the Backend Server**
   ```bash
   npm run dev

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd task-manager/task-manager-frontend
2. **Install Dependencies**

   ```bash
   npm install
3. **Run the Frontend Application**

   ```bash
   npm start

## Running the Application

1. **Start the Backend**: Ensure your backend server is running on port 5000.

2. **Start the Frontend**: Launch your React app and navigate through the authentication and task management pages.

3. **Test the Features**: 
- Use the registration and login pages to create an account.
- Add, edit, delete, and mark tasks as completed using the dashboard.