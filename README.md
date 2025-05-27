# Documan - Document Sharing Platform

A full-stack web application for sharing and managing documents with user authentication, categories, and advanced search features.

## Features

### User Features

- Authentication & Authorization
  - Register and login with email/password
  - JWT-based authentication
  - Role-based access control (Admin/User)
- Document Management
  - Upload and share documents
  - Browse by categories and levels
  - Like/Dislike documents
  - Save to personal library
  - Track recently viewed documents
  - Search functionality
- User Profile
  - Update profile information
  - Change avatar
  - View personal statistics

### Admin Features

- User Management
  - View all users
  - Delete users
  - Grant admin privileges
- Content Management
  - Manage document categories
  - Manage document levels
  - Moderate documents
- Dashboard
  - System statistics
  - User analytics
  - Document metrics

## Tech Stack

### Frontend

- **Framework**: React.js
- **UI Library**: Ant Design
- **State Management**: React Context
- **HTTP Client**: Axios
- **Routing**: React Router
- **Styling**: SCSS Modules

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer
- **Password Hashing**: bcrypt

## Project Structure

├── Frontend/
│ ├── public/ # Static files
│ └── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── contexts/ # React contexts
│ ├── api/ # API integration
│ └── styles/ # Global styles
├── Backend/
│ ├── middleware/ # Auth, upload middlewares
│ └── src/
│ ├── config/ # Database config
│ ├── controllers/# Request handlers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ └── services/ # Business logic

## Setup & Installation

### Prerequisites

- Node.js (>=12.x)
- MongoDB
- npm or yarn

### Backend Setup

1. Install dependencies

```bash
cd Backend
npm install
```

2. Create .env file

```bash
PORT=8080
MONGO_DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
```

3. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. Install dependencies

```bash
cd Frontend
npm install
```

2. Create .env file

```bash
REACT_APP_API_URL=http://localhost:8080/v1/api
```

3. Start development server

```bash
npm start
```

## API Documentation

Base URL: /v1/api

### Authentication

POST /register - Register new user
POST /login - User login

### Documents

POST /documents - Create document
GET /documents - Get all documents
GET /documents/:id - Get document by ID
DELETE /documents/:id - Delete document
GET /documents/search - Search documents
GET /documents/category/:id - Get by category
GET /documents/level/:id - Get by level

### Users

PUT /users/update - Update profile
GET /users/saved - Get saved documents
POST /users/save/:id - Save document
POST /users/like/:id - Like document
GET /users/recent - Get recently viewed

### Admin

GET /admin/statistics - System statistics
GET /admin/users - All users
POST /admin/categories - Manage categories
POST /admin/levels - Manage levels

### Error Codes

EC: 0 - Success
EC: 1 - Business logic error
EC: 2 - System error

## Contributor

[Nguyễn Quang Độ](https://github.com/nqdo26) - Leader
[Lê Thịnh Hưng](https://github.com/lethinhhung)
[Nguyễn Hồ Nhựt Đoan](https://github.com/NhutDoan2703)
