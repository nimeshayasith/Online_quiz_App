# CyberQuiz Pro - Frontend

A modern, interactive cybersecurity learning platform built with React and Tailwind CSS.

## Features

- **User Authentication**: Role-based access for Students and Admins
- **Interactive Quiz System**: Timed quizzes with instant feedback
- **Admin Dashboard**: Create and manage cybersecurity questions
- **Student Progress Tracking**: Performance analytics and history
- **Responsive Design**: Modern cyber-themed UI with dark mode
- **Real-time Features**: Live timer, progress tracking, and notifications

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   ├── auth/           # Authentication components
│   ├── quiz/           # Quiz-related components
│   ├── admin/          # Admin-specific components
│   ├── student/        # Student-specific components
│   └── ui/             # Base UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── context/            # React Context providers
├── assets/             # Static assets
└── data/               # Mock data and constants
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Backend API running on http://localhost:9192

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