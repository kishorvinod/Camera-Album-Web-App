# CamApp - Web Camera Application

A modern, responsive web application for capturing, organizing, and managing photos and videos using your device's camera.

## Features

- 📸 Capture photos and record videos directly in the browser
- 🔄 Switch between multiple cameras (front/rear)
- 📁 Create and manage albums to organize media
- 🔒 Secure authentication system
- 📱 Fully responsive design for mobile and desktop
- 🎥 Support for both image and video capture
- 🖼️ Gallery view with media preview
- ⚡ Real-time camera preview and controls

## Demo Account

You can test the application using these credentials:
- Email: test@example.com
- Password: password

Or register a new account with any email/password combination.

## Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Modern web browser with camera access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/camapp.git
   cd camapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the provided local URL

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── album/         # Album-related components
│   ├── auth/          # Authentication components
│   ├── capture/       # Camera capture components
│   ├── layout/        # Layout components
│   ├── media/         # Media display components
│   └── ui/            # Common UI components
├── pages/             # Page components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
└── main.tsx          # Application entry point
```

## Key Features Explained

### Camera Capture
- Real-time camera preview
- Support for multiple camera devices
- Photo capture with preview
- Video recording with playback
- Camera device switching

### Album Management
- Create new albums
- Rename existing albums
- Delete albums
- View album contents in grid layout
- Media count tracking

### Media Management
- Upload photos and videos to albums
- View media in full screen
- Delete individual media items
- Automatic thumbnail generation
- Support for both image and video formats

### Authentication
- User registration
- Secure login
- Protected routes
- Session management
- Automatic token handling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with MediaDevices API support

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint and TypeScript for code quality and type safety. Configuration files are included in the repository.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev/)