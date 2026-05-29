# Backend System Architecture Diagram

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        REACT FRONTEND                           │
│                    (http://localhost:3000)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP/REST Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   EXPRESS.JS SERVER                             │
│                 (http://localhost:5000)                         │
├─────────────────────────────────────────────────────────────────┤
│  MIDDLEWARE STACK:                                              │
│  ├─ CORS Middleware         (Enable cross-origin requests)      │
│  ├─ Body Parser             (Parse JSON)                        │
│  ├─ Logging Middleware      (Request/response logging)          │
│  ├─ Auth Middleware         (JWT verification - protected)      │
│  ├─ Authorization Middleware (Role checking - admin only)       │
│  └─ Error Handler           (Centralized error handling)        │
├─────────────────────────────────────────────────────────────────┤
│  API ROUTES:                                                    │
│  ├─ /api/auth               (5 endpoints)                       │
│  ├─ /api/students           (5 endpoints)                       │
│  ├─ /api/teachers           (5 endpoints)                       │
│  ├─ /api/admissions         (4 endpoints)                       │
│  └─ /api/contact            (5 endpoints)                       │
├─────────────────────────────────────────────────────────────────┤
│  CONTROLLERS:                                                   │
│  ├─ authController          (Business logic for auth)           │
│  ├─ studentController       (CRUD for students)                 │
│  ├─ teacherController       (CRUD for teachers)                 │
│  ├─ admissionController     (Admission operations)              │
│  └─ contactController       (Contact operations)                │
└────────┬──────────────────────────────────┬─────────────────────┘
         │                                  │
         │                                  │
    Mongoose ORM                     JWT Token Generation
         │                                  │
┌────────▼──────────────────────────────────▼─────────────────────┐
│                       DATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│  MONGODB DATABASE (localhost:27017/preschool-mgt)               │
│  └─ Collections:                                                │
│     ├─ users                 (Authentication users)             │
│     ├─ students              (Student records)                  │
│     ├─ teachers              (Teacher records)                  │
│     ├─ admissions            (Admission requests)               │
│     └─ contacts              (Contact submissions)              │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Request Flow Diagram

```
USER REQUEST
    │
    ▼
┌──────────────────────┐
│ Express Receives     │
│ HTTP Request         │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ CORS Middleware      │
│ Check Origin         │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Parse JSON Body      │
│ Content-Type Check   │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Logging Middleware   │
│ Log Request Info     │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐          ┌──────────────────────┐
│ Route Matching       │─────────▶│ Public Route?        │
│ Find Handler         │          │ (No Auth Required)   │
└──────────────────────┘          └──────────────────────┘
    │                                     │
    │ NO                                  │ YES
    │                                     ▼
    ▼                          ┌──────────────────────┐
┌──────────────────────┐      │ Controller Logic     │
│ Auth Middleware?     │      │ Process Request      │
│ Extract JWT Token    │      │ Return Response      │
└──────────────────────┘      └──────────────────────┘
    │                                     │
    ▼                                     │
┌──────────────────────┐                 │
│ Verify Token         │                 │
│ Decode Payload       │                 │
└──────────────────────┘                 │
    │                                     │
    ▼ (Valid)                            │
┌──────────────────────┐                 │
│ Authorization Check  │                 │
│ Role Permission      │                 │
└──────────────────────┘                 │
    │                                     │
    ▼ (Authorized)                       │
┌──────────────────────┐                 │
│ Attach User to Req   │                 │
│ req.user = {...}     │                 │
└──────────────────────┘                 │
    │                                     │
    ▼                                     │
┌──────────────────────┐                 │
│ Controller Logic     │◀────────────────┘
│ Process Request      │
│ Database Operations  │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Database Query       │
│ Mongoose Operation   │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Format Response      │
│ APIResponse Object   │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Send Response        │
│ res.status().json()  │
└──────────────────────┘
    │
    ▼
┌──────────────────────┐
│ Error Handler?       │
│ (If Error Occurred)  │
└──────────────────────┘
    │
    ▼
HTTP RESPONSE to CLIENT
```

## 🔐 Authentication Flow

```
USER
  │
  ├─────────────────────────┐
  │                         │
  ▼                         ▼
REGISTER                   LOGIN
  │                         │
  ▼                         ▼
Validate Input         Find User by Email
  │                         │
  ▼                         ▼
Email Unique Check     Compare Password
  │                         │
  ▼                         ▼
Hash Password           Check isActive
  │                         │
  ▼                         ▼
Save User              Generate JWT Token
  │                         │
  └─────────────┬───────────┘
                │
                ▼
         Return Token to Client
                │
                ▼
         Store in Frontend
      (localStorage/httpOnly)
                │
                ▼
         Include in Requests
      Authorization: Bearer <token>
                │
                ▼
         Server Verifies Token
                │
        ┌───────┴────────┐
        │                │
    VALID            INVALID
        │                │
        ▼                ▼
    Process         Return 401
    Request        Unauthorized
```

## 🗂️ File Organization

```
backend/
│
├── 📄 Configuration Files
│   ├── .env                 (Environment variables - local)
│   ├── .env.example         (Template for setup)
│   ├── .gitignore          (Git ignore rules)
│   ├── package.json        (Dependencies & scripts)
│   └── node_modules/       (Installed packages)
│
├── 📖 Documentation
│   ├── README.md           (Complete API docs)
│   ├── QUICKSTART.md       (Quick start guide)
│   ├── ARCHITECTURE.md     (Technical details)
│   └── COMPLETION_SUMMARY.md (This completion overview)
│
└── 📁 src/
    │
    ├── 🔌 config/
    │   └── db.js           (MongoDB connection)
    │
    ├── 📊 models/          (Mongoose Schemas)
    │   ├── User.js         (5 fields per model)
    │   ├── Student.js      
    │   ├── Teacher.js      
    │   ├── Admission.js    
    │   └── Contact.js      
    │
    ├── 🎮 controllers/     (Business Logic)
    │   ├── authController.js
    │   ├── studentController.js
    │   ├── teacherController.js
    │   ├── admissionController.js
    │   └── contactController.js
    │
    ├── 🛤️ routes/          (API Endpoints)
    │   ├── authRoutes.js
    │   ├── studentRoutes.js
    │   ├── teacherRoutes.js
    │   ├── admissionRoutes.js
    │   └── contactRoutes.js
    │
    ├── 🧩 middleware/      (Express Middleware)
    │   ├── auth.js         (JWT & Authorization)
    │   ├── errorHandler.js (Error Handling)
    │   └── logging.js      (Request Logging)
    │
    ├── 🔧 utils/           (Utility Functions)
    │   ├── apiResponse.js  (Response Formatting)
    │   ├── validation.js   (Input Validation)
    │   └── jwt.js          (Token Utilities)
    │
    ├── 🚀 app.js           (Express Setup)
    └── 🎯 server.js        (Server Entry Point)
```

## 📈 Data Flow for Student CRUD

```
CLIENT REQUEST: POST /api/students
                (with JWT token and student data)
                       │
                       ▼
            ┌──────────────────────┐
            │  Authentication Chk  │
            │  Verify JWT Token    │
            └──────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Authorization Chk   │
            │  Admin Role Only     │
            └──────────────────────┘
                       │
                       ▼
        ┌───────────────────────────────────┐
        │  Input Validation                 │
        │  Check Required Fields            │
        │  Validate Email Format            │
        └───────────────────────────────────┘
                       │
                       ▼
        ┌───────────────────────────────────┐
        │  studentController.addStudent()   │
        │  Prepare Data Object              │
        └───────────────────────────────────┘
                       │
                       ▼
        ┌───────────────────────────────────┐
        │  Student.create()                 │
        │  Mongoose Schema Validation       │
        │  MongoDB Insert Operation         │
        └───────────────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Database Response   │
            │  New Document ID     │
            └──────────────────────┘
                       │
                       ▼
        ┌───────────────────────────────────┐
        │  Format Response                  │
        │  sendSuccess()                    │
        │  201 status code                  │
        └───────────────────────────────────┘
                       │
                       ▼
        HTTP RESPONSE with Student Data
```

## 🔄 Error Handling Flow

```
REQUEST PROCESSING
    │
    ├─► Try Block Execution
    │      │
    │      ├─ Validation Error      ──┐
    │      ├─ Database Error        ──┤
    │      ├─ Authentication Error  ──┤
    │      └─ Unexpected Error      ──┤
    │                                   │
    ▼                                   ▼
ERROR HANDLER MIDDLEWARE
    │
    ▼
Determine Error Type
    │
    ├─ ValidationError  ──► 400 Bad Request
    ├─ JwtError        ──► 401 Unauthorized
    ├─ AuthorizationErr ──► 403 Forbidden
    ├─ NotFound        ──► 404 Not Found
    └─ Unknown         ──► 500 Server Error
    │
    ▼
Format Error Response
    {
        statusCode: XXX,
        data: null,
        message: "Error description",
        success: false
    }
    │
    ▼
Send to Client
```

## 🔐 JWT Token Lifecycle

```
┌─────────────────────────────────┐
│  USER LOGS IN                   │
│  Provides email & password      │
└──────────────────┬──────────────┘
                   │
                   ▼
         ┌──────────────────────┐
         │ Verify Credentials   │
         │ Check Password Hash  │
         └──────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │ Generate JWT Token           │
    │ Header.Payload.Signature     │
    │ Sign with JWT_SECRET         │
    │ Set 7-day expiry             │
    └──────────────────────────────┘
                   │
                   ▼
      ┌────────────────────────────┐
      │ Return Token to Client     │
      │ Client Stores Token        │
      └────────────────────────────┘
                   │
           ┌───────▼────────┐
           │                │
      Later Request     Much Later Request
      (Token Valid)    (Token Expired)
           │                │
           ▼                ▼
    ┌──────────────┐  ┌──────────────┐
    │ Verify Sig   │  │ Verify Sig   │
    │ Check Expiry │  │ Check Expiry │
    │ ✅ VALID     │  │ ❌ EXPIRED   │
    └──────────────┘  └──────────────┘
           │                │
           ▼                ▼
     Allow Request    Reject: 401
     Process Query    Return Error
           │
           ▼
    Return Response
```

## 📊 API Response Examples

### ✅ Success Response
```json
{
  "statusCode": 200,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "message": "Student retrieved successfully",
  "success": true
}
```

### ❌ Error Response
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Email already registered",
  "success": false
}
```

---

## 🎯 Key Components Summary

| Component | Purpose | Files |
|-----------|---------|-------|
| **Models** | Define data structure | 5 files |
| **Controllers** | Business logic | 5 files |
| **Routes** | API endpoints | 5 files |
| **Middleware** | Cross-cutting concerns | 3 files |
| **Utils** | Helper functions | 3 files |
| **Config** | Setup & configuration | 1 file |

---

**Architecture Complete! Ready for Integration! 🚀**
