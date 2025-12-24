# 🎯 Complete Deployment Guide - Frontend + Backend

## 📋 Full Stack Deployment Overview

```
┌─────────────────────────────────────────────────────────┐
│  User Browser                                           │
│  ↓                                                      │
│  Frontend (Vercel)                                     │
│  https://quiz-app.vercel.app                           │
│  ↓                                                      │
│  Backend API (Railway)                                 │
│  https://quiz-backend.up.railway.app/api               │
│  ↓                                                      │
│  MySQL Database (Railway)                              │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Order (IMPORTANT!)

**Deploy in this order to avoid configuration issues:**

1. ✅ **Backend** (Railway) - Get the API URL first
2. ✅ **Frontend** (Vercel) - Use the Railway URL

---

## Part 1: Backend Deployment (Railway)

### Step 1: Prepare Code
```bash
cd quiz-online-server
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app/)
2. **Sign in with GitHub**
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository
6. Railway will start building automatically

### Step 3: Configure Root Directory

Since backend is in a subdirectory:
1. Click on your service
2. **Settings** tab
3. Under **"Source"**:
   - **Root Directory**: `quiz-online-server`
   - **Watch Paths**: `quiz-online-server/**`
4. Click **Save**

### Step 4: Add MySQL Database

1. In your project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add MySQL"**
4. Wait for provisioning (~30 seconds)

### Step 5: Configure Environment Variables

Click on your **backend service** → **Variables** tab

Add these variables:

```bash
# Spring Configuration
SPRING_PROFILES_ACTIVE=production

# Database (use Railway's reference variables)
DATABASE_URL=jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

# Frontend URL (update after frontend deployment)
FRONTEND_URL=http://localhost:5174

# Java Memory Settings
JAVA_TOOL_OPTIONS=-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport
```

**Note**: The `${{MySQL.VARIABLENAME}}` syntax automatically references your MySQL service variables.

### Step 6: Generate Public URL

1. In your backend service → **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Railway creates a URL like: `https://quiz-backend-production-xxxx.up.railway.app`
4. **COPY THIS URL** - You'll need it for the frontend!

### Step 7: Verify Deployment

Test your backend:
```bash
# Health check
curl https://your-railway-url.up.railway.app/actuator/health

# Should return: {"status":"UP"}
```

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Update Environment Variable

Before deploying, update your frontend configuration:

**Option A: Update `.env.production` file**
```bash
cd quiz-online-client
```

Edit `.env.production`:
```env
VITE_API_BASE_URL=https://your-railway-url.up.railway.app/api
```

**Option B: Set in Vercel Dashboard** (Recommended)
You'll do this in Step 4 below.

### Step 2: Prepare Frontend Code
```bash
cd quiz-online-client
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Create Vercel Project

1. Go to [vercel.com](https://vercel.com/)
2. **Sign in with GitHub**
3. Click **"Add New..." → "Project"**
4. **Import** your GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `quiz-online-client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 4: Set Environment Variables

In Vercel project settings → **Environment Variables**:

Add:
```
Name: VITE_API_BASE_URL
Value: https://your-railway-url.up.railway.app/api
Environments: ✅ Production ✅ Preview ✅ Development
```

Click **"Add"**

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2 minutes)
3. Vercel will show your live URL: `https://your-app.vercel.app`

### Step 6: Update Backend CORS

Now update Railway to allow your Vercel domain:

1. Go back to **Railway** → Your backend service → **Variables**
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Railway will automatically redeploy

---

## 🔧 Final Configuration

### Update Both Platforms:

#### Railway Environment Variables (Final):
```bash
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
FRONTEND_URL=https://your-actual-vercel-app.vercel.app
JAVA_TOOL_OPTIONS=-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport
```

#### Vercel Environment Variables (Final):
```
VITE_API_BASE_URL=https://your-actual-railway-url.up.railway.app/api
```

---

## ✅ Testing Your Deployed Application

### 1. Test Backend Health
```bash
curl https://your-railway-url.up.railway.app/actuator/health
```
Expected: `{"status":"UP"}`

### 2. Test Backend API
```bash
curl https://your-railway-url.up.railway.app/api/quizzes/subjects
```
Expected: Array of subjects or empty array

### 3. Test Frontend
1. Open `https://your-app.vercel.app` in browser
2. Open Developer Console (F12) → Network tab
3. Try to **Sign Up** or **Sign In**
4. Check network requests - should call Railway URL
5. Should NOT see CORS errors

### 4. Test Full Flow
- ✅ Sign up new user
- ✅ Sign in
- ✅ Create quiz (if admin)
- ✅ Take quiz (if student)
- ✅ View results

---

## 🐛 Common Issues & Fixes

### Issue 1: CORS Error
**Symptoms**: 
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix**:
1. Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
2. Ensure it includes `https://` 
3. Check SecurityConfig.java was updated
4. Redeploy backend on Railway

### Issue 2: 502 Bad Gateway (Railway)
**Symptoms**: Backend won't start

**Fix**:
1. Check Railway logs for errors
2. Verify DATABASE_URL format is correct
3. Ensure MySQL service is running
4. Check Java version (should be 17)

### Issue 3: Database Connection Error
**Symptoms**: 
```
Communications link failure
```

**Fix**:
1. Verify MySQL service is running in Railway
2. Check DATABASE_URL uses `jdbc:mysql://` prefix
3. Add `?useSSL=false&allowPublicKeyRetrieval=true` to DATABASE_URL
4. Ensure DB_USERNAME and DB_PASSWORD reference MySQL service

### Issue 4: Vercel Build Fails
**Symptoms**: Build errors during Vercel deployment

**Fix**:
1. Ensure all imports are case-sensitive
2. Check all files exist in correct locations
3. Run `npm run build` locally first
4. Check build logs in Vercel dashboard

### Issue 5: Frontend Can't Connect to Backend
**Symptoms**: Network errors, timeout

**Fix**:
1. Verify `VITE_API_BASE_URL` includes `/api` at the end
2. Check Railway backend is running (visit health endpoint)
3. Ensure Railway domain is public (Settings → Networking)
4. Try accessing backend URL directly in browser

---

## 📊 Monitoring & Logs

### View Railway Logs:
1. Railway Dashboard → Your Service → **Logs** tab
2. Monitor startup logs
3. Watch for errors

### View Vercel Logs:
1. Vercel Dashboard → Your Project → **Deployments**
2. Click on a deployment → **Logs**

### View Browser Console:
1. Open your app in browser
2. Press **F12** → **Console** tab
3. Check for JavaScript errors
4. **Network** tab shows API calls

---

## 💰 Cost Breakdown

### Railway Free Tier:
- **$5 credit/month** (approx 500 hours)
- **512MB RAM**
- **Shared CPU**
- **1GB MySQL storage**

### Vercel Free Tier:
- **Unlimited deployments**
- **100GB bandwidth/month**
- **Unlimited websites**

**Total Cost**: **$0** for hobby projects! 🎉

---

## 🎓 Architecture Summary

```
┌──────────────────────────────────────────┐
│ GitHub Repository                        │
│  ├─ quiz-online-client/  (Vercel)       │
│  └─ quiz-online-server/  (Railway)      │
└──────────────────┬───────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    ┌────▼────┐         ┌────▼────┐
    │ Vercel  │         │ Railway │
    │         │────────▶│  API    │
    │Frontend │  HTTPS  │         │
    │  React  │         │ Spring  │
    └─────────┘         │  Boot   │
                        └────┬────┘
                             │
                        ┌────▼────┐
                        │  MySQL  │
                        │Database │
                        └─────────┘
```

---

## 🎯 Deployment Checklist

### Backend (Railway):
- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Root directory set to `quiz-online-server`
- [ ] MySQL database added
- [ ] Environment variables configured
- [ ] Public domain generated
- [ ] Health endpoint working
- [ ] API endpoints accessible

### Frontend (Vercel):
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Root directory set to `quiz-online-client`
- [ ] Environment variable `VITE_API_BASE_URL` set
- [ ] Build successful
- [ ] Public URL generated
- [ ] Can access website
- [ ] API calls working (no CORS errors)

### Final Integration:
- [ ] Backend CORS updated with Vercel URL
- [ ] Frontend can call backend API
- [ ] Database connections working
- [ ] User registration works
- [ ] User login works
- [ ] All features functional

---

## 🎉 Congratulations!

Your full-stack quiz application is now **LIVE** on the internet! 🚀

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-railway-app.up.railway.app
- **Database**: Managed by Railway

Share your app with the world! 🌍

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Spring Boot Production Best Practices](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Need Help?** Check:
- Railway Logs (for backend issues)
- Vercel Logs (for frontend build issues)
- Browser Console (for runtime issues)
