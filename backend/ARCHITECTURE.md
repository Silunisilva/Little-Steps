# Backend Architecture & Technical Decisions

## 🏗️ Architecture Decisions

### MVC Pattern Implementation
```
Controllers (Business Logic)
    ↓
Routes (API Endpoints)
    ↓
Models (Data Schema)
    ↓
Middleware (Cross-cutting concerns)
```

### File Organization Philosophy
- **Separation of Concerns**: Each file has a single responsibility
- **Scalability**: Easy to add new features without modifying existing code
- **Maintainability**: Clear structure makes debugging and updates straightforward
- **Testability**: Modular structure allows for unit testing

## 🔐 Security Implementation

### Password Management
```javascript
// Pre-save hook in User model
UserSchema.pre('save', async (next) => {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

### JWT Authentication
- **Token Generation**: `generateToken(userId, role)` creates 7-day tokens
- **Token Verification**: `verifyToken(token)` validates token authenticity
- **Protected Routes**: `authenticateToken` middleware checks every protected request
- **Role Authorization**: `authorize(...roles)` restricts access by user role

### CORS Configuration
- Whitelist specific frontend URL
- Only allow credentials from same-origin
- Prevent unauthorized cross-origin requests

## 📊 Data Models Overview

### User (Authentication)
- Email-based login
- Role-based access (admin/teacher)
- Soft delete (isActive flag)
- Password hashing pre-save

### Student
- Complete enrollment information
- Medical and emergency contact data
- Program tracking (nursery/pre-k/kindergarten)
- Parent contact information

### Teacher
- Professional qualifications tracking
- Assigned classes reference
- Employment status management
- Emergency contact details

### Admission
- Track application status (pending/approved/rejected)
- Admin review tracking
- Complete family information
- Program preference selection

### Contact
- Message categorization
- Read/unread tracking
- Reply functionality
- Submission tracking with timestamps

## 🚀 Middleware Stack

```
Incoming Request
    ↓
CORS Middleware (Enable cross-origin)
    ↓
Body Parser (Parse JSON)
    ↓
Logging Middleware (Log request)
    ↓
Route Handler (Business Logic)
    ↓
Authentication Middleware (if protected)
    ↓
Authorization Middleware (if role-protected)
    ↓
Error Handler (Catch errors)
    ↓
Response
```

## 🎯 API Response Design

### Consistent Response Format
```javascript
{
  statusCode: number,
  data: any | null,
  message: string,
  success: boolean
}
```

**Benefits:**
- Predictable format for frontend
- Easy error detection
- Standard data wrapper
- Clear success/failure indication

## ⚙️ Environment Configuration

### Development Environment
```
MONGODB_URI=mongodb://localhost:27017/preschool-mgt
NODE_ENV=development
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Production Considerations
- Use MongoDB Atlas for cloud hosting
- Strong JWT secret (min 32 characters)
- Production frontend URL
- Enable HTTPS
- Use environment-specific secrets

## 🔄 Authentication Flow

```
1. User Registration
   ├─ Validate input
   ├─ Hash password
   ├─ Save to database
   └─ Return JWT token

2. User Login
   ├─ Find user by email
   ├─ Compare passwords
   ├─ Verify account active
   └─ Generate JWT token

3. Protected Request
   ├─ Extract token from header
   ├─ Verify token signature
   ├─ Validate expiry
   ├─ Fetch user from database
   └─ Continue to route handler
```

## 📝 Error Handling Strategy

### Error Types Handled
1. **Validation Errors** - Input validation fails
2. **Authentication Errors** - Invalid/expired token
3. **Authorization Errors** - Insufficient permissions
4. **Database Errors** - MongoDB duplicate key, validation
5. **Not Found Errors** - Resource doesn't exist

### Error Response Example
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Email already registered",
  "success": false
}
```

## 🧪 Testing Recommendations

### Unit Tests
- Controller functions
- Validation utilities
- JWT token generation

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### Tools Suggested
- Jest for unit testing
- Supertest for API testing
- MongoDB Memory Server for testing

## 📈 Performance Considerations

1. **Database Indexing**: Add indexes on frequently queried fields
2. **Query Optimization**: Use `.select()` to limit fields
3. **Population Optimization**: Use `.populate()` carefully
4. **Caching**: Consider Redis for frequently accessed data
5. **Rate Limiting**: Implement express-rate-limit for API

## 🔄 Frontend Integration

### CORS Configuration
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```

### Frontend Headers
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'
}
```

### Token Storage
- Store JWT in httpOnly cookie or localStorage
- Include in Authorization header for requests
- Clear on logout

## 📦 Deployment Checklist

- [ ] Create .env with production values
- [ ] Update MONGODB_URI for production DB
- [ ] Set strong JWT_SECRET
- [ ] Configure FRONTEND_URL
- [ ] Test all endpoints
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure logging/monitoring
- [ ] Set up error tracking (e.g., Sentry)

## 🎓 Learning Resources for Team

- Express.js Routing: Learn route organization
- MongoDB Aggregation: Advanced queries
- JWT Security: Token best practices
- API Design: RESTful principles
