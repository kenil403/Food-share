# FoodShare Connect - Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### 1. MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
- Ensure MongoDB is running locally: `mongod` or start MongoDB service
- Check MongoDB connection string in `backend/.env`
- For MongoDB Atlas, ensure:
  - IP whitelist includes your IP
  - Username and password are correct
  - Connection string format is correct

#### 2. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
- Change PORT in `backend/.env` to a different port (e.g., 5001)
- Kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Linux/Mac: `lsof -ti:5000 | xargs kill`

#### 3. JWT Secret Error
**Error:** Token verification fails or auth issues

**Solutions:**
- Ensure `JWT_SECRET_KEY` is set in `backend/.env`
- Use a strong, unique secret key
- Don't use spaces in the secret key

#### 4. Email/OTP Not Sending
**Error:** Email sending fails or OTP not received

**Solutions:**
- Check email credentials in `backend/.env`
- For Gmail:
  - Enable 2-factor authentication
  - Generate an App Password
  - Use the App Password in `EMAIL_PASS`
- Ensure EMAIL_HOST and EMAIL_PORT are correct

### Frontend Issues

#### 1. API Connection Issues
**Error:** Network errors, CORS errors, or API calls failing

**Solutions:**
- Ensure backend is running on http://localhost:5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Verify CORS settings in `backend/app.js` include your frontend URL
- Clear browser cache and cookies

#### 2. Port 3000 Already in Use
**Error:** Something is already running on port 3000

**Solutions:**
- Kill process using port 3000 (similar to backend port issue)
- Or run on a different port: `PORT=3001 npm start`

#### 3. Module Not Found Errors
**Error:** `Module not found: Can't resolve...`

**Solutions:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 4. Routing Issues / Page Not Found
**Error:** Routes not working, 404 errors on page refresh

**Solutions:**
- Ensure React Router is properly set up in App.js
- For production builds, configure server to serve index.html for all routes
- Check that `exact` prop is removed from routes (React Router v6 syntax)

### Database Issues

#### 1. Schema Validation Errors
**Error:** Validation failed for field...

**Solutions:**
- Check model schemas in `backend/models/`
- Ensure all required fields are provided
- Verify data types match schema definitions

#### 2. Duplicate Key Error
**Error:** `E11000 duplicate key error`

**Solutions:**
- Unique constraint violated
- Check if email/username already exists
- Clear test data from database if needed

### Authentication Issues

#### 1. Login Not Working
**Solutions:**
- Check console for errors
- Verify backend `/login` endpoint is working
- Ensure credentials are correct
- Check if JWT token is being set in cookies
- Verify cookie settings (httpOnly, secure, sameSite)

#### 2. Session/Cookie Not Persisting
**Solutions:**
- Check browser cookie settings
- Ensure `credentials: true` in axios requests
- Verify CORS settings allow credentials
- Check cookie domain and path settings

### File Upload Issues

#### 1. Image Upload Fails
**Solutions:**
- Ensure `uploads/` directories exist in backend
- Check multer configuration
- Verify file size limits
- Check file type restrictions

#### 2. Images Not Displaying
**Solutions:**
- Verify file path in database
- Check static file serving in `backend/app.js`
- Ensure correct URL construction in frontend
- Check file permissions

### Build Issues

#### 1. Frontend Build Fails
**Solutions:**
```bash
cd frontend
npm run build
```
- Fix any linting errors shown
- Ensure all imports are correct
- Check for unused variables
- Verify all dependencies are installed

#### 2. Backend Production Issues
**Solutions:**
- Set `NODE_ENV=production` in environment
- Ensure all environment variables are set
- Check production database connection
- Verify static file paths

### Performance Issues

#### 1. Slow API Responses
**Solutions:**
- Add database indexes for frequently queried fields
- Implement pagination for large datasets
- Use select to limit fields returned
- Enable gzip compression
- Implement caching where appropriate

#### 2. Frontend Loading Slowly
**Solutions:**
- Optimize images (compress, use appropriate formats)
- Implement lazy loading for components
- Use React.memo for expensive components
- Code-split large bundles
- Minimize third-party dependencies

## Debug Commands

### Backend
```bash
# Check if server is running
curl http://localhost:5000/health

# View MongoDB connection
# (add console.log in dbConnection.js)

# Check environment variables
node -e "require('dotenv').config(); console.log(process.env)"
```

### Frontend
```bash
# Check React environment variables
npm start
# Open browser console and check process.env

# Build with detailed output
npm run build -- --verbose

# Check for outdated packages
npm outdated
```

### Database
```bash
# Connect to MongoDB
mongosh

# Switch to database
use cvm_hackathon

# List collections
show collections

# Check user count
db.users.countDocuments()

# View recent users
db.users.find().limit(5)
```

## Environment Setup Checklist

### Backend Setup
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed/accessible
- [ ] `backend/.env` file created and configured
- [ ] Dependencies installed (`npm install`)
- [ ] MongoDB running
- [ ] Server starts without errors
- [ ] Health endpoint accessible

### Frontend Setup
- [ ] Dependencies installed (`npm install`)
- [ ] `frontend/.env` created (optional)
- [ ] Backend URL configured correctly
- [ ] App starts without errors
- [ ] Can access all routes

### Integration Testing
- [ ] Frontend can connect to backend
- [ ] Login/signup working
- [ ] File uploads working
- [ ] All CRUD operations functional
- [ ] Session persistence working

## Getting Help

If issues persist:
1. Check browser console for errors
2. Check backend server logs
3. Verify all environment variables are set
4. Try with a fresh database
5. Check MongoDB logs
6. Review recent code changes
7. Test API endpoints with Postman/Thunder Client

## Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [JWT.io](https://jwt.io/)
