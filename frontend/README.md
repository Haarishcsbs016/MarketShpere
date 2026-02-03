# MarketSphere Frontend - React Application

This is the frontend client application for MarketSphere, built with **React** and **Vite**.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create a `.env` file in the `frontend` directory:
```bash
cp .env.example .env
```

Edit `.env` and set:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:3000**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   └── AdminDashboard.jsx
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Loading.jsx
│   ├── store/              # Redux store
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── cartSlice.js
│   ├── lib/                # Utilities
│   │   └── api.js          # Axios API client
│   ├── App.jsx             # Main app component with routes
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── package.json            # Dependencies
```

## 🛣️ Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/products` - Product listing with filters
- `/products/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/:id` - Order details
- `/admin` - Admin dashboard

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Config
The Vite config includes a proxy for API requests:
- All `/api/*` requests are proxied to `http://localhost:5000`

### Environment Variables
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## 🔐 Features

- ✅ User authentication (Login/Register)
- ✅ Product browsing and search
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Order tracking
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ State management with Redux
- ✅ Protected routes

## 🚀 Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 📝 Notes

- The frontend communicates with the backend API at `http://localhost:5000/api`
- JWT tokens are stored in cookies
- All API requests include authentication headers automatically
- The app uses React Router for client-side navigation

