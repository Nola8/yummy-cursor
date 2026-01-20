# Yummy Restaurant - Full-Stack Application

A modern Restaurant/Café website built with React.js frontend and Node.js/Express backend, featuring menu management, online ordering, table reservations, and admin dashboard.

## 🏗️ Architecture

### Frontend
- **React.js** with React Router
- Component-based UI architecture
- Context API for state management
- Axios for API communication

### Backend
- **Node.js + Express**
- RESTful API architecture
- JWT-based authentication
- MongoDB with Mongoose

### Database
- **MongoDB** with the following collections:
  - Users (customers & admins)
  - Menu Items
  - Orders
  - Reservations
  - Reviews

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd yummy-cursor
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment Setup**

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yummy-restaurant
JWT_SECRET=your-secret-key-here
```

5. **Run the application**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
yummy-cursor/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation middleware
│   ├── config/          # Database & config files
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── services/    # API services
│   │   └── App.js       # Main App component
│   └── public/
└── README.md
```

## 🌟 Features

### Customer Features
- Browse menu with category filtering and search
- Add items to cart and place orders
- Make table reservations
- Submit reviews and ratings
- Contact form

### Admin Features
- Dashboard with analytics
- Manage menu items (CRUD)
- View and update orders
- Manage reservations
- View customer reviews

## 🔐 Default Admin Account

After first run, register a user and manually update the role to "admin" in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@yummy.com" },
  { $set: { role: "admin" } }
)
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user orders

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get reservations (admin)
- `PUT /api/reservations/:id` - Update reservation status

### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews` - Get all reviews

### Contact
- `POST /api/contact` - Submit contact form

## 🛠️ Tech Stack

- Frontend: React, React Router, Axios, Context API
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

