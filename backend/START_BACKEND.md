# How to Start the Backend Server

## Quick Start

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Install dependencies (if not done):**
   ```powershell
   npm install
   ```

3. **Create .env file (if not exists):**
   ```powershell
   # Copy from example
   copy env.example .env
   ```

4. **Edit .env file and set:**
   ```
   MONGODB_URI=mongodb://localhost:27017/marketsphere
   JWT_SECRET=your_secret_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB:**
   - **Local MongoDB**: Make sure MongoDB service is running
   - **MongoDB Atlas**: Use your connection string in MONGODB_URI

6. **Start the server:**
   ```powershell
   npm run dev
   ```

## Expected Output

When successful, you should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

## Troubleshooting

### Error: "Cannot find package 'express'"
**Solution:** Reinstall dependencies
```powershell
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Error: "MongoDB connection error"
**Solution:** 
- Make sure MongoDB is running
- Check MONGODB_URI in .env file
- For local MongoDB: `mongodb://localhost:27017/marketsphere`
- For MongoDB Atlas: Use your connection string

### Port 5000 already in use
**Solution:** Change port in .env file
```
PORT=5001
```
Then update frontend .env: `VITE_API_URL=http://localhost:5001/api`

## Test the Server

Once running, test it:
- Open browser: http://localhost:5000/api/health
- Should see: `{"status":"OK","message":"MarketSphere API is running"}`

