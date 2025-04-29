# Countries Explorer

A modern React application that allows users to explore countries worldwide using the REST Countries API. Built with React, Tailwind CSS, and featuring user authentication with local storage.

## 🌟 Features

- **Country Exploration**: Browse detailed information about countries worldwide
- **Search & Filter**: Find countries by name or filter by region
- **User Authentication**: Simple login system with local storage
- **Favorites System**: Logged-in users can save their favorite countries
- **Responsive Design**: Optimized for all screen sizes
- **Real-time Updates**: Dynamic content updates without page reloads

## 🚀 Live Demo

Visit the live application: [Countries Explorer](https://country-app-nine-plum.vercel.app/)

## 🛠️ Technologies Used

- React 18
- Tailwind CSS
- Lucide React (for icons)
- REST Countries API
- Local Storage (for user data)
- React Hot Toast (for notifications)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd countries-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🏗️ Build Process

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📱 Usage Guide

### Browsing Countries
- View all countries on the main page
- Click on any country card to see detailed information
- Use the search bar to find specific countries
- Filter countries by region using the dropdown menu

### User Authentication
1. Click the "Login" button in the navigation bar
2. Enter any username and password (demo purposes)
3. After logging in, you can:
   - Add countries to favorites
   - View your favorite countries at the top of the page
   - Remove countries from favorites
   - Logout when finished

### Managing Favorites
- Click the heart icon on any country card to add/remove from favorites
- Your favorites are saved in local storage and persist between sessions
- View all your favorites in the dedicated section when logged in

## 🔍 API Integration

The application uses the following REST Countries API endpoints:

- `GET /v3.1/all?fields=name,capital,population,region,flags,languages,currencies,maps`
  - Fetches all countries with specific fields
- Region filtering is handled client-side for better performance
- Search functionality is implemented with client-side filtering

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Local Storage Structure

The application uses local storage for:
- User session data: `user`
- Favorites data: `favorites_${username}`

## 🧪 Testing

Run tests using:
```bash
npm run test
```

## 📦 Deployment

The application is deployed on Netlify with automatic deployments from the main branch.

To deploy your own instance:
1. Fork this repository
2. Connect your fork to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

