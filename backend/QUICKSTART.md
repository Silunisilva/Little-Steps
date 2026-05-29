# Quick Start Guide - Backend

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Already configured in `.env` for local development:
- MongoDB: `localhost:27017`
- Server Port: `5000`
- Frontend: `http://localhost:3000`

### Step 3: Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:5000
```

### Step 4: Test the Server

Open browser and visit:
```
http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2024-05-29T10:30:45.123Z"
}
```

## 🧪 Quick API Tests

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "admin",
    "phone": "1234567890"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the returned `token` for next step.

### 3. Get Current User (Replace TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### 4. Add a Student (Admin only)
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith",
    "dateOfBirth": "2020-01-15",
    "gender": "female",
    "parentName": "Jane Smith",
    "parentEmail": "jane@example.com",
    "parentPhone": "9876543210",
    "program": "nursery"
  }'
```

## 📱 Using Postman or Insomnia

### Import Collection
1. Open Postman/Insomnia
2. Create requests with:
   - URL: `http://localhost:5000/api/...`
   - Method: GET, POST, PUT, DELETE
   - Headers: `Authorization: Bearer <token>`
   - Body: JSON

## 🛠️ Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with auto-reload |
| `npm start` | Start production server |
| `npm test` | Run tests (placeholder) |

## 📂 File Structure Quick Reference

```
src/
├── config/db.js          ← MongoDB connection
├── models/               ← Data schemas
├── controllers/          ← Business logic
├── routes/               ← API endpoints
├── middleware/           ← Authentication, error handling
├── utils/                ← Helpers and validators
├── app.js               ← Express setup
└── server.js            ← Server entry point
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:** Ensure MongoDB is running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"
**Solution:** Change PORT in .env
```
PORT=5001
```

### Issue: "JWT secret not defined"
**Solution:** Check .env file has JWT_SECRET

### Issue: "Token verification failed"
**Solution:** 
- Ensure token is included in Authorization header
- Check token format: `Bearer <token>`
- Verify token hasn't expired

## 📚 Next Steps

1. **Connect Frontend**: Update React to call these APIs
2. **Add More Features**: Extend controllers with new functionality
3. **Database Optimization**: Add indexes for frequently queried fields
4. **Error Tracking**: Integrate Sentry or similar
5. **API Documentation**: Generate Swagger/OpenAPI docs
6. **Testing**: Write unit and integration tests

## 🔗 Useful Links

- Full Documentation: See [README.md](./README.md)
- Architecture Details: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- Mongoose Docs: https://mongoosejs.com/

## 💡 Tips

- Check console output for detailed error messages
- Use `req.user` to access current user in protected routes
- Add custom validation in controller before database operations
- Test all endpoints with correct HTTP methods
- Always include Authorization header for protected routes

## 🆘 Need Help?

Check the console logs:
```
[TIMESTAMP] METHOD PATH - Status: CODE - Duration: XXms
```

This shows:
- What API was called
- The HTTP status code
- How long it took

---

**Ready to go! Start building! 🎉**
