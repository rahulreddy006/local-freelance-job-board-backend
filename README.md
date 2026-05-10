# Local Freelance Job Platform Backend

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express.js](https://img.shields.io/badge/Express.js-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Zod](https://img.shields.io/badge/Validation-Zod-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-style backend API for a local freelance job marketplace that connects students with local businesses for short-term gigs and freelance opportunities.

This backend provides secure authentication, role-based authorization, gig management, application workflows, and business-owner approval systems. Businesses can create gigs, students can apply, and businesses can accept or reject applications through a structured workflow.

The project is designed with scalable backend architecture principles using Express.js, MongoDB, JWT authentication, middleware-based validation, and service-layer business logic.

---

# Features

* JWT Authentication
* Role-Based Authorization (Student / Business)
* Secure Password Hashing with bcrypt
* Gig Creation & Management
* Student Application System
* Duplicate Application Prevention
* Ownership-Based Authorization
* Application Approval/Rejection Workflow
* Automatic Rejection of Other Applicants on Acceptance
* Gig Status Lifecycle Management
* Request Validation using Zod
* MongoDB Relationship Population
* Modular MVC + Service Architecture

---

# Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Node.js            | Runtime Environment             |
| Express.js         | Backend Framework               |
| MongoDB            | NoSQL Database                  |
| Mongoose           | MongoDB ODM                     |
| JWT (jsonwebtoken) | Authentication                  |
| bcrypt             | Password Hashing                |
| Zod                | Request Validation              |
| dotenv             | Environment Variable Management |
| Nodemon            | Development Server              |
| ES Modules         | Modern JavaScript Modules       |

⚠️ Verify versions from `package.json`.

---

# Architecture Overview

The project follows a modular backend architecture with separation of concerns:

* **Routes** → API endpoint definitions
* **Controllers** → Request/response handling
* **Services** → Business logic
* **Models** → MongoDB schemas
* **Middlewares** → Authentication, authorization, validation
* **Validators** → Zod schemas
* **Utils** → Reusable utilities like custom errors

---

# Folder Structure

```bash
backend/
│
├── src/
│   ├── config/
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── gig.controller.js
│   │   └── application.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validator.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── gig.model.js
│   │   └── application.model.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── gig.route.js
│   │   └── application.route.js
│   │
│   ├── services/
│   │   ├── user.service.js
│   │   ├── gig.service.js
│   │   └── application.service.js
│   │
│   ├── utils/
│   │   └── error.util.js
│   │
│   └── validators/
│       ├── auth.validator.js
│       └── gig.validator.js
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# Getting Started

## Prerequisites

* Node.js v18+ (recommended: v22)
* MongoDB Atlas or local MongoDB instance
* npm or yarn

---

## Clone the Repository

```bash
git clone https://github.com/your-username/local-freelance-job-platform.git
```

```bash
cd local-freelance-job-platform/backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
MONGO_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your_super_secret_key
```

---

## Start Development Server

```bash
npm run dev
```

Server should run on:

```bash
http://localhost:4000
```

---

# Environment Variables

| Variable   | Description                 | Example             | Required |
| ---------- | --------------------------- | ------------------- | -------- |
| PORT       | Server port                 | `4000`              | Yes      |
| MONGO_URI  | MongoDB connection string   | `mongodb+srv://...` | Yes      |
| JWT_SECRET | Secret used for JWT signing | `supersecretkey123` | Yes      |

---

# API Endpoints Overview

## Authentication Routes

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| POST   | `/api/v1/register` | Register a new user         | No            |
| POST   | `/api/v1/login`    | Login user and generate JWT | No            |

---

## Gig Routes

| Method | Endpoint                           | Description                                | Auth Required        |
| ------ | ---------------------------------- | ------------------------------------------ | -------------------- |
| POST   | `/api/v1/gigs`                     | Create a gig                               | Yes (Business)       |
| GET    | `/api/v1/gigs`                     | Get all open gigs                          | No                   |
| GET    | `/api/v1/gigs/:gigId`              | Get single gig details                     | No                   |
| GET    | `/api/v1/my-gigs`                  | Get all gigs created by logged-in business | Yes (Business)       |
| GET    | `/api/v1/gigs/:gigId/applications` | Get applications for a gig                 | Yes (Business Owner) |

---

## Application Routes

| Method | Endpoint                                     | Description                | Auth Required        |
| ------ | -------------------------------------------- | -------------------------- | -------------------- |
| POST   | `/api/v1/gigs/:gigId/apply`                  | Apply for a gig            | Yes (Student)        |
| PATCH  | `/api/v1/applications/:applicationId/status` | Accept/Reject application  | Yes (Business Owner) |
| GET    | `/api/v1/my-applications`                    | Get student's applications | Yes (Student)        |

---

# Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

## Authentication Flow

1. User logs in using email and password
2. Server validates credentials
3. JWT token is generated
4. Client stores token
5. Token is sent in request headers for protected routes

---

## Authorization Header Format

```http
Authorization: Bearer <token>
```

---

## Role-Based Authorization

Supported roles:

* `student`
* `business`

Protected routes use middleware-based authorization:

```js
authorizeRoles("business")
```

---

# Database

The project uses **MongoDB** with **Mongoose** ODM.

## Models

### User

| Field    | Type                         |
| -------- | ---------------------------- |
| name     | String                       |
| email    | String                       |
| password | String                       |
| role     | Enum (`student`, `business`) |

---

### Gig

| Field          | Type            |
| -------------- | --------------- |
| title          | String          |
| description    | String          |
| price          | Number          |
| skillsRequired | Array<String>   |
| deadline       | Date            |
| status         | Enum            |
| ownerId        | ObjectId → User |

---

### Application

| Field     | Type                                     |
| --------- | ---------------------------------------- |
| gigId     | ObjectId → Gig                           |
| appliedBy | ObjectId → User                          |
| status    | Enum (`pending`, `accepted`, `rejected`) |

The application model uses a compound unique index to prevent duplicate applications.

---

# Scripts

| Script        | Description                            |
| ------------- | -------------------------------------- |
| `npm run dev` | Start development server using nodemon |
| `npm start`   | Start production server                |

⚠️ Verify scripts from `package.json`.

---

# Business Workflow

```text
Business creates gig
        ↓
Students apply
        ↓
Business reviews applications
        ↓
Business accepts one application
        ↓
Other pending applications auto rejected
        ↓
Gig status changes to "in-progress"
```

---

# Validation

The project uses **Zod** for request validation.

Validation is implemented through reusable middleware:

```js
validate(schema)
```

This ensures:

* Clean API inputs
* Consistent error responses
* Protected backend logic

---

# Error Handling

Custom operational errors are handled using a reusable `AppError` utility:

```js
throw new AppError("Unauthorized access", 403)
```

This improves:

* Error consistency
* API reliability
* Debugging clarity

---

# Security Features

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Ownership-based authorization
* Duplicate application prevention
* Input validation using Zod

---

# Future Improvements

* Pagination
* Search & Filtering
* Google OAuth Login
* Refresh Tokens
* Rate Limiting
* Centralized Error Middleware
* Notifications System
* Real-Time Messaging
* File Uploads
* Docker Deployment

---

# Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software.
```

