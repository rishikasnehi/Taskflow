# TaskFlow Backend API

A scalable MERN-stack backend for a Jira-inspired project management and team collaboration platform.
This backend powers authentication, project management, task workflows, analytics dashboards, and protected APIs for productivity applications.

---

# Features

## Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-based User Structure

## Project Management

* Create Project
* Get All Projects
* Get Single Project
* Update Project
* Delete Project

## Task Management

* Create Tasks
* Assign Tasks
* Update Task Status
* Priority Management
* Due Dates
* Task Filtering
* Delete Tasks

## Dashboard Analytics

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* High Priority Tasks
* Recent Tasks

## Backend Architecture

* RESTful APIs
* MongoDB Relationships
* Global Error Handling
* Async Middleware Handling
* Scalable Folder Structure

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT (jsonwebtoken)
* bcryptjs

## Utilities

* dotenv
* cors
* morgan
* nodemon

---

# Project Structure


taskflow-backend/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validations/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

# Environment Variables

Create a `.env` file in the root directory.


PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_authentication_string

---

# Installation & Setup

## Clone Repository

git clone https://github.com/your-username/taskflow.git

## Navigate to Backend Folder

cd taskflow/taskflow-backend

## Install Dependencies

npm install

## Start Development Server

npm run dev

---

# API Base URL

http://localhost:5000/api
---

# API Endpoints

# Authentication

## Register User

POST /api/auth/register

## Login User

POST /api/auth/login

## Get Current User

GET /api/auth/me

---

# Projects

## Create Project

POST /api/projects

## Get All Projects

GET /api/projects

## Get Single Project

GET /api/projects/:id

## Update Project

PUT /api/projects/:id

## Delete Project

DELETE /api/projects/:id

---

# Tasks

## Create Task

POST /api/tasks

## Get All Tasks

GET /api/tasks

## Get Single Task

GET /api/tasks/:id

## Update Task

PUT /api/tasks/:id

## Delete Task

DELETE /api/tasks/:id

---

# Dashboard

## Get Dashboard Statistics

GET /api/dashboard/stats

---

# Authentication Header

Protected routes require JWT token.

Authorization: Bearer YOUR_TOKEN

---

# Database Models

## User

* name
* email
* password
* role

## Project

* title
* description
* status
* createdBy
* members

## Task

* title
* description
* status
* priority
* dueDate
* project
* assignedTo
* createdBy

---

# Status Workflow

todo
in-progress
review
done
```

---

# Priority Workflow

low
medium
high

---

# Scripts

## Run Development Server

npm run dev

## Run Production Server

npm start

---

# Deployment

Recommended Platforms:

* Render
* Railway
* MongoDB Atlas

---

# Future Improvements

* Real-time collaboration
* Notifications
* File uploads
* Activity logs
* Team invitations
* Sprint management

---

# Author

Developed by Rishika Snehi

Portfolio:
https://rishika-snehi.netlify.app/
