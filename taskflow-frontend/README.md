# TaskFlow Frontend

A modern, production-level React frontend for TaskFlow MERN project.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Context API** - State management

## Features

✨ **Modern UI** - SaaS-style design inspired by Jira, Linear, ClickUp
🔐 **Authentication** - JWT-based with Context API
📊 **Dashboard** - Stats, charts, and recent activities
📋 **Projects** - CRUD operations with beautiful cards
✅ **Kanban Tasks** - Drag-and-drop ready board layout
🌓 **Dark Mode** - Light/dark theme support
📱 **Responsive** - Mobile-first design

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   └── common/          # Layout components (Navbar, Sidebar)
├── pages/               # Page components
├── layouts/             # Layout wrappers
├── context/             # Context API (Auth)
├── services/            # API services
├── routes/              # Route guards and routing logic
├── utils/               # Helper functions
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Update API URL** in `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Development

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

## Available Pages

### Authentication
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/dashboard` - Dashboard with stats and recent activities
- `/projects` - Projects management
- `/tasks` - Kanban board for tasks

## API Integration

The frontend communicates with the backend API:

**Auth Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Project Endpoints:**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Task Endpoints:**
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

**Dashboard Endpoints:**
- `GET /api/dashboard/stats` - Get dashboard stats

## Dark Mode

Users can toggle dark mode using the sun/moon icon in the navbar. Preference is saved to localStorage.

## Component Library

### UI Components
- `Button` - Primary, secondary, ghost, danger variants
- `Input` - Text input with label and error handling
- `Textarea` - Text area with label
- `Select` - Dropdown select
- `Modal` - Dialog modal
- `Badge` - Status badges
- `Card` - Card component
- `Spinner` - Loading spinner
- `Alert` - Alert messages

### Common Components
- `Sidebar` - Navigation sidebar
- `Navbar` - Top navigation bar
- `DashboardLayout` - Main layout wrapper

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Tailwind component classes in `index.css`
- **Color Palette** - Professional primary and secondary colors
- **Responsive Design** - Mobile-first approach

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Components loaded on demand
- **Optimized Builds** - Vite's optimized production builds
- **Responsive Images** - Optimized for different screen sizes

## Future Enhancements

- [ ] Real-time collaboration with WebSocket
- [ ] Advanced task filtering and search
- [ ] Time tracking integration
- [ ] File attachments for tasks
- [ ] Team collaboration features
- [ ] Activity timeline
- [ ] Custom field types
- [ ] Workflow automation

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file for correct `VITE_API_URL`
- Check browser console for CORS errors

### Build Errors
```bash
npm install --legacy-peer-deps
npm run build
```

## License

MIT
