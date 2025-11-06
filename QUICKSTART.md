# Quick Start Guide

## First Time Setup

1. **Install all dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure Backend Environment:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Configure Frontend Environment (Optional):**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit if needed
   ```

## Running the Application

### Option 1: Using Batch Script (Windows)
```bash
# From project root
start-dev.bat
```

### Option 2: Using Shell Script (Linux/Mac)
```bash
# From project root
chmod +x start-dev.sh
./start-dev.sh
```

### Option 3: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## Default User Types

The application supports three user types:
- **Volunteer:** Can view drives and post reviews
- **Hotel:** Can create and manage food donation drives
- **Admin:** Can manage all content and users

## Quick Commands

```bash
# Install all dependencies (from root)
cd backend && npm install && cd ../frontend && npm install

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build

# Run tests
cd backend && npm test
cd frontend && npm test
```

## Common Issues

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

### Quick Fixes

1. **MongoDB not connecting:**
   - Start MongoDB: `mongod` or service start
   - Check connection string in `backend/.env`

2. **Port already in use:**
   - Change PORT in `backend/.env`
   - Or kill process: `taskkill /PID <PID> /F` (Windows)

3. **API not connecting:**
   - Ensure backend is running
   - Check FRONTEND_URL in backend/.env
   - Clear browser cache

## Next Steps

1. Create your first admin account via signup
2. Explore the dashboard
3. Add a food donation drive
4. Test the volunteer workflow

For detailed documentation, see [README.md](README.md)
