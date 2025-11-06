# Quick Fix Reference - Common React/Node.js Errors

## Quick Error Solutions

### 1. "Cannot read properties of undefined (reading 'X')"
```javascript
// ❌ Bad
error.response.data.message

// ✅ Good
error.response?.data?.message || 'Default message'
// Or
if (error.response && error.response.data) {
    error.response.data.message
}
```

### 2. "Invalid URL" in axios
```javascript
// ❌ Bad
axios.get(ConString + "endpoint")

// ✅ Good
axios.get(`${ConString}endpoint`)
```

### 3. "Text nodes cannot appear as a child of <tbody>"
```javascript
// ❌ Bad - renders 0 when empty
{data.length && data.map(...)}

// ✅ Good
{data.length > 0 && data.map(...)}
// Or
{data.length > 0 ? data.map(...) : <EmptyState />}
```

### 4. "Invalid DOM property 'class'"
```javascript
// ❌ Bad - HTML syntax
<div class="container">

// ✅ Good - React syntax
<div className="container">
```

### 5. "Each child should have a unique 'key' prop"
```javascript
// ❌ Bad
{data.map(item => <div>{item.name}</div>)}

// ✅ Good
{data.map((item, index) => <div key={item.id || index}>{item.name}</div>)}
```

### 6. "Proxy error: Could not proxy request"
```javascript
// Check package.json has proxy
{
  "proxy": "http://localhost:5000"
}

// Or use full URL
axios.get('http://localhost:5000/api/endpoint')
```

### 7. "ECONNREFUSED" - Backend not running
```bash
# Start backend
cd backend
npm run dev

# Check if running
curl http://localhost:5000/health
```

### 8. MongoDB Connection Failed
```bash
# Start MongoDB
net start MongoDB  # Windows
brew services start mongodb-community  # Mac
sudo systemctl start mongod  # Linux

# Check .env
MONGO_URL=mongodb://localhost:27017/dbname
```

## React Common Fixes

### Convert HTML to JSX Checklist
- [ ] `class` → `className`
- [ ] `for` → `htmlFor`
- [ ] `stroke-width` → `strokeWidth`
- [ ] `stroke-linecap` → `strokeLinecap`
- [ ] Self-closing tags: `<img />` not `<img>`
- [ ] camelCase event handlers: `onClick` not `onclick`

## Axios Error Handling Template

```javascript
try {
    const response = await axios.get(`${baseURL}endpoint`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    // Handle success
    setData(response.data.items || []);
    
} catch (error) {
    console.error('Error:', error);
    
    // Safe error message access
    const message = error.response?.data?.message 
        || error.message 
        || 'An error occurred';
    
    toast.error(message);
    setData([]); // Set default empty state
}
```

## Common Console Warnings & Fixes

| Warning | Fix |
|---------|-----|
| `class` → `className` | Change all HTML `class` to `className` |
| Missing `key` prop | Add `key={item.id}` to mapped elements |
| `target="_blank"` warning | Add `rel="noreferrer"` |
| validateDOMNesting | Check HTML structure (no `<p>` in `<p>`, etc.) |
| Cannot read property of undefined | Add optional chaining `?.` or null checks |

## Backend Quick Fixes

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

### Environment Variables Not Loading
```javascript
// At top of file
import dotenv from 'dotenv';
dotenv.config();

// Check if loaded
console.log('PORT:', process.env.PORT || 'NOT SET');
```

### CORS Issues
```javascript
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
```

## Debugging Commands

```bash
# Check if backend is running
curl http://localhost:5000/health

# Check Node.js version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for port usage
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux
```

## Quick Start After Fixes

```bash
# Terminal 1 - Backend
cd backend
npm install  # if needed
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install  # if needed
npm start

# Terminal 3 - MongoDB (if not running as service)
mongod
```

## Verification Checklist

- [ ] Backend running: http://localhost:5000/health
- [ ] Frontend running: http://localhost:3000
- [ ] MongoDB connected (check backend logs)
- [ ] No console errors in browser (F12)
- [ ] No React warnings in console
- [ ] API calls working (check Network tab)

## Pro Tips

1. **Always use browser DevTools (F12)**
   - Console tab: JavaScript errors
   - Network tab: API call issues
   - Elements tab: DOM structure

2. **Check both terminals**
   - Backend terminal: API errors
   - Frontend terminal: Build errors

3. **Read error messages carefully**
   - File name and line number
   - Stack trace shows execution path
   - Error type indicates category

4. **When stuck:**
   1. Clear browser cache
   2. Restart dev servers
   3. Check .env files
   4. Verify dependencies installed
   5. Check TROUBLESHOOTING.md

## Resources

- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [Axios Docs](https://axios-http.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- Project TROUBLESHOOTING.md

---

**Remember:** Most errors are typos or configuration issues. Read the error message carefully! 🐛
