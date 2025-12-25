# 🎓 Online Quiz Application

A full-stack web application for creating and taking online quizzes, built for the 4th Semester Web Application Development module. This project demonstrates modern web development practices with a React frontend and Spring Boot backend, deployed on cloud platforms.

## 🌐 Live Demo

- **Frontend**: [https://online-quiz-app-seven-plum.vercel.app](https://online-quiz-app-seven-plum.vercel.app)
- **Backend**: [https://stellar-analysis-production-3ade.up.railway.app](https://stellar-analysis-production-3ade.up.railway.app)

## ✨ Key Features

### For Students
- 📝 **Take Quizzes**: Interactive quiz-taking experience with multiple choice questions
- ⏱️ **Timer System**: Timed quizzes with automatic submission
- 📊 **Instant Results**: View scores and correct answers immediately after submission
- 📈 **Progress Tracking**: Track quiz history and performance over time
- 🔐 **Secure Authentication**: JWT-based authentication system

### For Administrators
- ➕ **Create Questions**: Add new quiz questions with multiple subjects
- ✏️ **Manage Questions**: Update and delete existing questions
- 📋 **Quiz Management**: Organize questions by subject and difficulty
- 👥 **User Management**: Monitor user registrations and activities

### Special Features
- 🎨 **Modern UI/UX**: Cyber-themed interface with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode**: Eye-friendly dark theme
- 🔄 **Real-time Updates**: Live feedback and notifications
- ☁️ **Cloud Deployment**: Hosted on Vercel (frontend) and Railway (backend)
- 🗄️ **Database Integration**: MySQL database for persistent storage
- 🔒 **Spring Security**: Protected API endpoints with role-based access

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 7.3.0
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.1.1
- **HTTP Client**: Axios 1.7.9
- **Icons**: Lucide React 0.469.0
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Security**: Spring Security with JWT
- **Database**: MySQL 8
- **ORM**: Hibernate/JPA
- **API Style**: RESTful
- **Deployment**: Railway

### Database
- **Type**: MySQL 8.0
- **Hosting**: Railway MySQL
- **Connection Pool**: HikariCP

## 📁 Project Structure

```
Online_quiz_App/
├── quiz-online-client/         # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── admin/        # Admin features
│   │   │   ├── Auth/         # Authentication
│   │   │   ├── common/       # Shared components
│   │   │   ├── quiz/         # Quiz components
│   │   │   └── ui/           # UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Helper functions
│   ├── public/               # Static assets
│   └── package.json
│
└── quiz-online-server/        # Spring Boot Backend
    ├── src/
    │   ├── main/
    │   │   ├── java/com/dailycodework/quizonline/
    │   │   │   ├── config/          # Configuration classes
    │   │   │   ├── controller/      # REST Controllers
    │   │   │   ├── dto/             # Data Transfer Objects
    │   │   │   ├── model/           # Entity classes
    │   │   │   ├── repository/      # JPA Repositories
    │   │   │   ├── service/         # Business logic
    │   │   │   └── exception/       # Custom exceptions
    │   │   └── resources/
    │   │       └── application-production.properties
    │   └── test/                    # Unit tests
    └── pom.xml
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cyberquiz-pro-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```bash
VITE_API_URL=http://localhost:9192/api
VITE_APP_NAME=CyberQuiz Pro
```

5. Start development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## API Integration

The frontend communicates with the Spring Boot backend through REST APIs:

- **Authentication**: `/api/auth/*`
- **Quiz Management**: `/api/quizzes/*`
- **Quiz Results**: `/api/quiz-results/*`

## User Roles

### Student Features
- Take interactive quizzes
- View quiz history and performance
- Track progress across subjects
- Timer-based challenges

### Admin Features
- Create and manage questions
- View student performance analytics
- Manage quiz subjects and difficulty levels
- Toggle question activation status

## Cybersecurity Subjects

The platform covers 12 key cybersecurity domains:

1. Network Security
2. Ethical Hacking
3. Cryptography
4. Incident Response
5. Risk Management
6. Malware Analysis
7. Digital Forensics
8. Cloud Security
9. Web Application Security
10. Mobile Security
11. IoT Security
12. Social Engineering

## Development Guidelines

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React best practices and hooks patterns
- Use TypeScript for type safety (optional)
- Keep components small and focused

### File Naming
- Components: PascalCase (e.g., `QuizCard.jsx`)
- Hooks: camelCase starting with "use" (e.g., `useAuth.js`)
- Services: camelCase (e.g., `quizService.js`)
- Utils: camelCase (e.g., `helpers.js`)

### Component Structure
```jsx
// Component imports
import React, { useState, useEffect } from 'react';
import { ComponentName } from './ComponentName';

// Service imports
import { serviceFunction } from '../services/service';

// Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

## Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables
Set the following environment variables for production:
```bash
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=CyberQuiz Pro
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Created by **Nimesha** - Cybersecurity Education Enthusiast

## Support

For support and questions, please contact through the application's contact page or open an issue in the repository.