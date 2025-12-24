# Railway Deployment Guide for Spring Boot Backend

## 🚂 Step-by-Step Railway Deployment

### Step 1: Prepare Your Repository

1. **Commit all changes** to Git:
```bash
cd quiz-online-server
git add .
git commit -m "Add Railway production configuration"
git push
```

---

### Step 2: Create Railway Project

1. Go to **[Railway.app](https://railway.app/)**
2. Sign in with **GitHub**
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

---

### Step 3: Configure Root Directory

Since your backend is in a subdirectory:
1. In Railway Dashboard → **Settings**
2. Under **"Source"** section, set:
   - **Root Directory**: `quiz-online-server`
   - **Watch Paths**: Leave default or set to `quiz-online-server/**`

---

### Step 4: Add MySQL Database

Railway provides a MySQL database service:

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will automatically create a MySQL instance
4. Get connection details from the **MySQL service** → **Variables** tab

---

### Step 5: Configure Environment Variables

In Railway Dashboard → Your Service → **Variables** tab, add:

#### Required Variables:
```bash
# Spring Profile
SPRING_PROFILES_ACTIVE=production

# Port (Railway sets this automatically, but you can override)
PORT=9192

# Database Configuration (Railway MySQL variables)
DATABASE_URL=${MYSQL_URL}
DB_USERNAME=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

# Frontend URL (Your Vercel deployment URL)
FRONTEND_URL=https://your-vercel-app.vercel.app

# Java Options (for memory optimization)
JAVA_TOOL_OPTIONS=-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport
```

#### Railway MySQL Connection Variables (automatically available):
- `MYSQL_URL` - Full JDBC connection URL
- `MYSQL_HOST` - Database host
- `MYSQL_PORT` - Database port (usually 3306)
- `MYSQL_DATABASE` - Database name
- `MYSQL_USER` - Database username
- `MYSQL_PASSWORD` - Database password

**Note**: If `MYSQL_URL` uses `mysql://` instead of `jdbc:mysql://`, you need to transform it:

```bash
# Railway provides: mysql://user:pass@host:3306/database
# Spring Boot needs: jdbc:mysql://host:3306/database?user=user&password=pass

# Option 1: Use separate variables (recommended)
DATABASE_URL=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}?useSSL=true&serverTimezone=UTC
DB_USERNAME=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

# Option 2: Create custom DATABASE_URL
DATABASE_URL=jdbc:mysql://<replace-with-railway-mysql-host>:3306/<database-name>?useSSL=true
```

---

### Step 6: Build Configuration

Railway should auto-detect your Spring Boot app. If needed, add these settings:

**Settings** → **Build**:
- **Build Command**: `./mvnw clean package -DskipTests`
- **Start Command**: `java -Dserver.port=$PORT -Dspring.profiles.active=production -jar target/quiz-online-0.0.1-SNAPSHOT.jar`

---

### Step 7: Deploy

1. Click **"Deploy"** or push to GitHub
2. Railway will automatically:
   - Build your Spring Boot application
   - Run Maven package
   - Start the application
3. Monitor logs in Railway dashboard

---

### Step 8: Get Your Railway URL

1. After deployment, go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Railway will give you a URL like:
   ```
   https://your-app-name.up.railway.app
   ```
4. **Copy this URL** - you'll need it for your frontend!

---

### Step 9: Test Your Backend

Test your Railway backend:
```bash
# Health check
curl https://your-app-name.up.railway.app/actuator/health

# Test API endpoint
curl https://your-app-name.up.railway.app/api/quizzes/subjects
```

---

### Step 10: Update Frontend Configuration

Now update your **frontend** (Vercel) with the Railway backend URL:

#### In Vercel Dashboard:
1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL`:
   ```
   https://your-app-name.up.railway.app/api
   ```
4. **Redeploy** your frontend

#### Or update `.env.production` locally:
```env
VITE_API_BASE_URL=https://your-app-name.up.railway.app/api
```

---

## 🔧 Important Railway Settings

### Database Connection Notes:

Railway's MySQL URL format might be:
```
mysql://user:password@host:3306/railway
```

But Spring Boot needs:
```
jdbc:mysql://host:3306/railway
```

**Solution**: Use the transformation in Step 5 above.

### Memory Configuration:

For Railway's free tier (512MB RAM), the Java options are crucial:
```bash
JAVA_TOOL_OPTIONS=-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport
```

This ensures Java doesn't exceed available memory.

---

## 🐛 Troubleshooting

### Build Fails?
- Check logs in Railway dashboard
- Ensure Java 17 is specified in `pom.xml`
- Try adding `maven.compiler.source=17` to environment variables

### Database Connection Fails?
- Verify `DATABASE_URL` format (must start with `jdbc:mysql://`)
- Check if MySQL service is running in Railway
- Ensure database credentials are correct
- Add `?useSSL=false&allowPublicKeyRetrieval=true` to DATABASE_URL if SSL issues

### App Crashes After Deploy?
- Check if `PORT` environment variable is set
- Monitor logs for out-of-memory errors
- Reduce `spring.datasource.hikari.maximum-pool-size` if needed

### CORS Errors?
- Ensure `FRONTEND_URL` is set in Railway
- Verify CORS configuration in `SecurityConfig.java` includes your Vercel domain
- Check that Vercel URL is correct (with `https://`)

---

## 📋 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Root directory set to `quiz-online-server`
- [ ] MySQL database added
- [ ] Environment variables configured
- [ ] Application deployed successfully
- [ ] Railway domain generated
- [ ] Health check endpoint working
- [ ] Frontend updated with Railway URL
- [ ] CORS configured for Vercel domain
- [ ] Test login/register from deployed frontend

---

## 🎯 Final Architecture

```
Frontend (Vercel)
   ↓
   https://your-app.vercel.app
   ↓
   Calls API at: https://backend.up.railway.app/api
   ↓
Backend (Railway)
   ↓
   Connects to MySQL Database (Railway)
```

---

## 💡 Cost Optimization

Railway **Free Tier** includes:
- $5 credit per month
- 512MB RAM
- Shared CPU

**Tips**:
- Use efficient queries to reduce CPU usage
- Keep connection pool small (5 max connections)
- Monitor usage in Railway dashboard

---

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [Railway MySQL Guide](https://docs.railway.app/databases/mysql)
- [Railway Java Support](https://nixpacks.com/docs/providers/java)

---

Your backend is now ready for Railway! 🚀
