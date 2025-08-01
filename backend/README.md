# Service Center Backend

## Vercel Deployment Issues Fixed

### Issues Found and Fixed:

1. **Missing `serverless-http` dependency** ✅
   - Added `serverless-http` to package.json
   - Required for Vercel serverless functions

2. **Database Connection Issues** ✅
   - Improved MongoDB connection handling for serverless environment
   - Added connection pooling and timeout configurations
   - Graceful error handling in production

3. **CORS Configuration** ✅
   - Updated CORS settings for production deployment
   - Added proper origin handling

4. **Environment Variables** ✅
   - Added health check endpoint for monitoring
   - Improved error handling middleware

### Required Environment Variables for Vercel:

Set these in your Vercel project settings:

```
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Installation:

```bash
npm install
```

### Local Development:

```bash
npm run dev
```

### Vercel Deployment:

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy - Vercel will automatically detect the configuration

### Health Check:

After deployment, test the health endpoint:
```
GET https://your-backend-domain.vercel.app/api/health
```

### API Endpoints:

- `/api/health` - Health check
- `/api/auth` - Authentication routes
- `/api/customers` - Customer management
- `/api/vehicles` - Vehicle management
- `/api/appointments` - Appointment management
- `/api/jobcards` - Job card management
- `/api/inventory` - Inventory management
- `/api/invoices` - Billing routes
- `/api/service-types` - Service type management
- `/api/reports` - Reports routes
- `/api/users` - User management
- `/api/test` - Test routes 