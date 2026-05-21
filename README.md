# Local Freelance Job Platform Backend

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express.js](https://img.shields.io/badge/Express.js-5.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Google OAuth](https://img.shields.io/badge/Auth-Google_OAuth-red)
![Swagger](https://img.shields.io/badge/API-Swagger-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-style backend API for a local freelance job marketplace that connects students with local businesses for short-term gigs and freelance opportunities.

This backend enables businesses to post gigs, students to apply, and businesses to review, accept, or reject applications through a structured workflow. The platform also supports secure JWT authentication, Google OAuth onboarding, refresh token authentication, advanced querying, and role-based authorization.

The project is designed using scalable backend engineering principles with modular architecture, service-layer business logic, middleware-driven validation, centralized error handling, production security middleware, and interactive Swagger API documentation.

---

# Live Deployment

## Live API

https://local-freelance-backend.onrender.com

## Swagger Documentation

https://local-freelance-backend.onrender.com/api-docs

---

# Features

- JWT Authentication & Authorization
- Google OAuth Login with Passport.js
- Refresh Token Authentication Flow
- Role-Based Authorization (Student / Business)
- Gig Creation & Management
- Student Application Workflow
- Duplicate Application Prevention
- Ownership-Based Authorization
- Automatic Rejection of Other Applicants on Acceptance
- Pagination, Filtering, Search & Sorting
- Swagger/OpenAPI Documentation
- Zod Request Validation
- Winston Logging
- Morgan Request Logging
- Rate Limiting
- MongoDB Injection Protection
- Helmet Security Middleware
- CORS Configuration
- Modular MVC + Service Architecture
- Production Deployment on Render

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication |
| Passport.js | OAuth authentication |
| passport-google-oauth20 | Google OAuth strategy |
| bcryptjs | Password hashing |
| Zod | Request validation |
| Morgan | HTTP request logging |
| Winston | Structured logging |
| express-rate-limit | Rate limiting |
| Helmet | Security headers |
| CORS | Cross-origin resource sharing |
| express-mongo-sanitize | MongoDB injection prevention |
| dotenv | Environment variable management |
| Nodemon | Development server |
| Swagger UI Express | Interactive API documentation |
| Swagger JSDoc | Swagger/OpenAPI generation |
| ES Modules | Modern JavaScript module system |

⚠️ Verify exact package versions from `package.json`.

---

# Architecture Overview

The project follows a modular backend architecture with clear separation of concerns.

## Architecture Layers

- **Routes** → API endpoint definitions
- **Controllers** → Request/response handling
- **Services** → Business logic
- **Models** → MongoDB schemas
- **Middlewares** → Authentication, authorization, validation, security
- **Validators** → Zod validation schemas
- **Config** → Database, logger, Swagger, Passport configuration
- **Utils** → Reusable helpers and custom error handling

---

# Folder Structure

```bash
backend/
│
├── src/
│   ├── config/
│   │   ├── db.config.js
│   │   ├── logger.config.js
│   │   ├── passport.config.js
│   │   └── swagger.config.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── gig.controller.js
│   │   └── application.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimiter.middleware.js
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
│   │   ├── auth.service.js
│   │   ├── gig.service.js
│   │   └── application.service.js
│   │
│   ├── utils/
│   │   ├── appError.util.js
│   │   └── asyncHandler.util.js
│   │
│   └── validators/
│       ├── auth.validator.js
│       ├── gig.validator.js
│       └── application.validator.js
│
├── logs/
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

- Node.js v18+ (recommended: v22)
- MongoDB Atlas or local MongoDB instance
- npm or yarn

---

## Clone Repository

```bash
git clone https://github.com/rahulreddy006/local-freelance-job-board-backend.git
```

```bash
cd local-freelance-job-board-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=4000

MONGO_URI=mongodb+srv://your-mongodb-uri

JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

API_URL=http://localhost:4000/api/v1
```

---

## Start Development Server

```bash
npm run dev
```

---

## Start Production Server

```bash
npm start
```

---

## Local Server URL

```bash
http://localhost:4000
```

---

# Environment Variables

| Variable | Purpose | Example | Required |
|---|---|---|---|
| PORT | Application server port | `4000` | Yes |
| MONGO_URI | MongoDB connection string | `mongodb+srv://...` | Yes |
| JWT_SECRET | JWT access token secret | `supersecret123` | Yes |
| JWT_REFRESH_SECRET | JWT refresh token secret | `refreshsecret456` | Yes |
| JWT_EXPIRES_IN | Access token expiration | `15m` | Yes |
| JWT_REFRESH_EXPIRES_IN | Refresh token expiration | `7d` | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client ID | `123456.apps.googleusercontent.com` | Yes |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | `GOCSPX-xxxxx` | Yes |
| GOOGLE_CALLBACK_URL | OAuth callback URL | `http://localhost:4000/api/v1/auth/google/callback` | Yes |
| API_URL | Base API URL for Swagger | `http://localhost:4000/api/v1` | Yes |

---

# API Endpoints Overview

## Authentication Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/v1/register` | Register a new user | No |
| POST | `/api/v1/login` | Login user and generate tokens | No |
| POST | `/api/v1/refresh-token` | Generate new access token | No |
| PATCH | `/api/v1/complete-profile` | Complete Google OAuth onboarding | Yes |
| GET | `/api/v1/auth/google` | Initiate Google OAuth login | No |
| GET | `/api/v1/auth/google/callback` | Google OAuth callback route | No |

---

## Gig Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/v1/gigs` | Get all active gigs with filtering/search | No |
| POST | `/api/v1/gigs` | Create a new gig | Yes (Business) |
| GET | `/api/v1/gigs/:gigId` | Get gig details by ID | No |
| GET | `/api/v1/my-gigs` | Get all gigs created by logged-in business | Yes (Business) |

---

## Application Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/v1/gigs/:gigId/apply` | Apply for a gig | Yes (Student) |
| PATCH | `/api/v1/applications/:applicationId/status` | Accept/reject application | Yes (Business Owner) |
| GET | `/api/v1/my-applications` | Get all student applications | Yes (Student) |
| GET | `/api/v1/gigs/:gigId/applications` | Get applications for a specific gig | Yes (Business Owner) |

---

# Authentication

The project uses JWT-based authentication with refresh token support and Google OAuth onboarding.

## Authentication Flow

### Local Authentication

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in
4. Access token and refresh token are generated
5. Client sends access token in Authorization header

---

### Google OAuth Flow

1. User clicks "Login with Google"
2. Backend redirects user to Google OAuth consent screen
3. Google returns callback with user profile
4. Backend creates or links account
5. JWT tokens are generated
6. User completes onboarding role selection

---

## Authorization Header

```http
Authorization: Bearer <access_token>
```

---

## Supported Roles

- `student`
- `business`

---

# Database

The project uses MongoDB with Mongoose ODM.

## User Model

| Field | Type |
|---|---|
| name | String |
| email | String |
| password | String |
| provider | Enum (`local`, `google`) |
| googleId | String |
| role | Enum (`student`, `business`) |
| isOnboarded | Boolean |

---

## Gig Model

| Field | Type |
|---|---|
| title | String |
| description | String |
| price | Number |
| skillsRequired | Array<String> |
| deadline | Date |
| status | Enum |
| ownerId | ObjectId → User |

---

## Application Model

| Field | Type |
|---|---|
| gigId | ObjectId → Gig |
| appliedBy | ObjectId → User |
| proposal | String |
| status | Enum (`pending`, `accepted`, `rejected`) |

The application model uses a compound unique index to prevent duplicate applications.

---

# Query Features

The gigs API supports advanced querying:

## Pagination

```bash
/api/v1/gigs?page=1&limit=10
```

---

## Search

```bash
/api/v1/gigs?search=frontend
```

---

## Filtering

```bash
/api/v1/gigs?skill=nodejs
```

---

## Sorting

```bash
/api/v1/gigs?sort=price_desc
```

Supported sorting:
- `newest`
- `oldest`
- `price_asc`
- `price_desc`

---

# Security Features

- Password hashing using bcrypt
- JWT authentication
- Refresh token authentication
- Helmet security middleware
- MongoDB injection sanitization
- Request rate limiting
- Protected routes
- Ownership-based authorization
- Input validation with Zod
- CORS protection

---

# Logging

The project uses:

- **Morgan** → HTTP request logging
- **Winston** → Structured application logging

Logs are separated for:
- incoming requests
- errors
- production monitoring

---

# Swagger API Documentation

Interactive Swagger documentation is available at:

```bash
https://local-freelance-backend.onrender.com/api-docs
```

Swagger includes:
- Request bodies
- Response schemas
- Authentication testing
- Query parameters
- Route descriptions

---

# Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server using nodemon |
| `npm start` | Start production server |
| `npm run server` | ⚠️ Verify this script in package.json |

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

# Future Improvements

- Redis caching
- Docker containerization
- CI/CD pipelines
- File uploads with Cloudinary
- Email verification
- Forgot/reset password flow
- Real-time notifications
- WebSocket chat system
- Payment integration
- Automated testing with Jest & Supertest

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
git commit -m "feat: add your feature"
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
of this software and associated documentation files to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software.
```
