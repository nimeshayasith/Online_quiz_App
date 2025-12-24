# 🚀 Railway Deployment - Quick Start

## ✅ Pre-Deployment Checklist

Your backend is now **Railway-ready**! Here's what was added:

### Files Created:
- ✅ [application-production.properties](src/main/resources/application-production.properties) - Production config
- ✅ [railway.toml](railway.toml) - Railway build config
- ✅ [nixpacks.json](nixpacks.json) - Nixpacks configuration
- ✅ [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Detailed deployment guide

### Code Updated:
- ✅ SecurityConfig.java - Added health check endpoints & environment-based CORS
- ✅ pom.xml - Added Spring Boot Actuator for health checks

---

## 🎯 5-Minute Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Configure for Railway deployment"
git push
```

### 2. Deploy on Railway

1. Go to **[railway.app](https://railway.app/)** → Sign in with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. **Settings** → Set **Root Directory**: `quiz-online-server`

### 3. Add MySQL Database

1. Click **"+ New"** → **Database** → **MySQL**
2. Wait for it to provision

### 4. Set Environment Variables

In your backend service → **Variables**:

```bash
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
DB_USERNAME=${MYSQLUSER}
DB_PASSWORD=${MYSQLPASSWORD}
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Note**: Replace the last line with your actual Vercel URL after deploying frontend.

### 5. Generate Domain

1. **Settings** → **Networking** → **Generate Domain**
2. Copy your Railway URL: `https://your-app.up.railway.app`

### 6. Update Frontend

In Vercel environment variables:
```
VITE_API_BASE_URL=https://your-app.up.railway.app/api
```

---

## 🧪 Test Your Deployment

```bash
# Health check
curl https://your-app.up.railway.app/actuator/health

# Test API
curl https://your-app.up.railway.app/api/quizzes/subjects
```

---

## 📖 Need More Details?

See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for comprehensive guide with troubleshooting.

---

## 🎉 You're Done!

Your backend will be live in ~5 minutes! 🚀
