# Preschool Management System - Backend API

A production-ready Node.js/Express backend for managing a Preschool System with MongoDB, featuring authentication, student management, teacher management, admissions, and contact forms.

## 🚀 Features

- **Authentication**: JWT-based authentication with role-based access control (Admin/Teacher)
- **Student Management**: CRUD operations for student records
- **Teacher Management**: CRUD operations for teacher profiles
- **Admission System**: Submission and tracking of admission requests
- **Contact Forms**: Contact form submission with reply functionality
- **Security**: Password hashing with bcryptjs, protected routes with middleware
- **Error Handling**: Centralized error handling and validation
- **Logging**: Request/response logging middleware
- **CORS**: Configured for React frontend
- **Health Check**: Server health monitoring endpoint

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

## 🔧 Installation

### 1. Clone and Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### 3. Configure .env

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/preschool-mgt
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/preschool-mgt

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
```
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "teacher",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "teacher",
    "token": "jwt_token"
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Login User
```
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```

---

### Student Endpoints

#### Get All Students
```
GET /api/students
```
**Query Parameters:**
- `status`: Filter by status (active, inactive, graduated)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### Get Student by ID
```
GET /api/students/:id
```

#### Add New Student (Admin only)
```
POST /api/students
```
**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "dateOfBirth": "2020-01-15",
  "gender": "female",
  "parentName": "Jane Smith",
  "parentEmail": "jane@example.com",
  "parentPhone": "9876543210",
  "program": "nursery",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701"
  },
  "emergencyContact": {
    "name": "Uncle Bob",
    "phone": "5555555555"
  },
  "medicalInfo": {
    "allergies": "Peanuts",
    "specialNeeds": "None"
  }
}
```

#### Update Student (Admin only)
```
PUT /api/students/:id
```

#### Delete Student (Admin only)
```
DELETE /api/students/:id
```

---

### Teacher Endpoints

#### Get All Teachers
```
GET /api/teachers
```
**Query Parameters:**
- `status`: Filter by status (active, inactive, on-leave)

#### Get Teacher by ID
```
GET /api/teachers/:id
```

#### Add New Teacher (Admin only)
```
POST /api/teachers
```
**Request Body:**
```json
{
  "firstName": "Mrs.",
  "lastName": "Johnson",
  "email": "mrs.johnson@example.com",
  "phone": "5555550000",
  "specialization": "general",
  "qualifications": ["Early Childhood Education", "CPR Certified"],
  "address": {
    "street": "456 Oak Ave",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701"
  },
  "emergencyContact": {
    "name": "John Johnson",
    "phone": "5555551111",
    "relationship": "Spouse"
  }
}
```

#### Update Teacher (Admin only)
```
PUT /api/teachers/:id
```

#### Delete Teacher (Admin only)
```
DELETE /api/teachers/:id
```

---

### Admission Endpoints

#### Submit Admission Request (Public)
```
POST /api/admissions
```
**Request Body:**
```json
{
  "childFirstName": "Tommy",
  "childLastName": "Brown",
  "dateOfBirth": "2021-05-10",
  "gender": "male",
  "program": "pre-k",
  "parentFirstName": "Michael",
  "parentLastName": "Brown",
  "parentEmail": "michael@example.com",
  "parentPhone": "5555552222",
  "address": {
    "street": "789 Elm St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62702"
  },
  "message": "Very interested in enrolling our son"
}
```

#### Get All Admissions (Admin only)
```
GET /api/admissions
```
**Query Parameters:**
- `status`: Filter by status (pending, approved, rejected)

#### Get Admission by ID (Admin only)
```
GET /api/admissions/:id
```

#### Update Admission Status (Admin only)
```
PUT /api/admissions/:id
```
**Request Body:**
```json
{
  "status": "approved"
}
```

---

### Contact Endpoints

#### Submit Contact Form (Public)
```
POST /api/contact
```
**Request Body:**
```json
{
  "firstName": "Robert",
  "lastName": "Wilson",
  "email": "robert@example.com",
  "phone": "5555553333",
  "subject": "Inquiry about summer program",
  "message": "I would like to know more about your summer programs",
  "type": "inquiry"
}
```

#### Get All Contacts (Admin only)
```
GET /api/contact
```
**Query Parameters:**
- `isRead`: Filter by read status (true/false)

#### Get Contact by ID (Admin only)
```
GET /api/contact/:id
```

#### Reply to Contact (Admin only)
```
PUT /api/contact/:id
```
**Request Body:**
```json
{
  "reply": "Thank you for your inquiry. We will contact you soon."
}
```

#### Delete Contact (Admin only)
```
DELETE /api/contact/:id
```

---

### Health Check Endpoint

#### Check Server Status
```
GET /health
```

**Response:**
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-05-29T10:30:45.123Z"
}
```

## 🔐 Authentication

### How to Use Authentication

1. **Register a new user:**
   ```bash
   POST /api/auth/register
   ```

2. **Login to get JWT token:**
   ```bash
   POST /api/auth/login
   ```

3. **Use token in protected routes:**
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── studentController.js  # Student logic
│   │   ├── teacherController.js  # Teacher logic
│   │   ├── admissionController.js # Admission logic
│   │   └── contactController.js  # Contact logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── errorHandler.js       # Error handling
│   │   └── logging.js            # Request logging
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Student.js            # Student schema
│   │   ├── Teacher.js            # Teacher schema
│   │   ├── Admission.js          # Admission schema
│   │   └── Contact.js            # Contact schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── studentRoutes.js      # Student endpoints
│   │   ├── teacherRoutes.js      # Teacher endpoints
│   │   ├── admissionRoutes.js    # Admission endpoints
│   │   └── contactRoutes.js      # Contact endpoints
│   ├── utils/
│   │   ├── apiResponse.js        # Response formatter
│   │   ├── validation.js         # Input validation
│   │   └── jwt.js                # JWT utilities
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🛡️ Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for admin and teachers
- **Input Validation**: All inputs are validated before processing
- **CORS Protection**: Configured CORS headers for security
- **Error Handling**: Safe error messages without exposing sensitive info

## 🚀 Deployment

### Prepare for Production

1. **Update environment variables:**
   ```bash
   NODE_ENV=production
   JWT_SECRET=use_a_strong_random_secret
   MONGODB_URI=your_production_mongodb_uri
   FRONTEND_URL=your_production_frontend_url
   ```

2. **Use MongoDB Atlas** for cloud hosting:
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster and get connection string
   - Update `MONGODB_URI` in .env

3. **Deploy to hosting platform:**
   - Heroku: `git push heroku main`
   - Railway: Connect GitHub repo
   - Render: Connect GitHub repo
   - AWS: EC2 or Elastic Beanstalk

## 📝 API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": {...},
  "message": "Success message",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error message",
  "success": false
}
```

## 🐛 Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## 🤝 Frontend Integration

### Example: Using Fetch API

```javascript
// Register
const register = async (userData) => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Get Students with token
const getStudents = async (token) => {
  const response = await fetch('http://localhost:5000/api/students', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy coding! 🎉**
