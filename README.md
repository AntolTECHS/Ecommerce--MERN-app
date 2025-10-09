# MERN Shop

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) featuring product management, shopping cart, user authentication, and M-Pesa payment integration.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Product Management**: Browse and view product listings with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items and manage cart contents
- **Order Management**: Place orders and view order history
- **M-Pesa Integration**: Secure payment processing via M-Pesa STK Push
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Real-time Updates**: Dynamic cart and order status updates

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **pnpm** package manager
- **M-Pesa Developer Account** (for payment integration)

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **Bcrypt.js** - Password hashing
- **Axios** - HTTP client for M-Pesa API
- **Moment.js** - Date/time manipulation

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📁 Project Structure

```
mern-shop/
├── backend/
│   ├── Models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── Routes/
│   │   ├── auth.js
│   │   ├── product.js
│   │   ├── order.js
│   │   └── mpesa.js
│   ├── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/Mern-E-Commerce.git
cd Mern-E-Commerce
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file in the backend directory
touch .env
```

Add the following environment variables to your `.env` file:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/mern-shop

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_business_shortcode
MPESA_CALLBACK_URL=your_callback_url
```

```bash
# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies (using pnpm)
pnpm install
# or using npm
npm install

# Start the development server
pnpm dev
# or
npm run dev
```

The frontend application will run on `http://localhost:5173`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### M-Pesa
- `POST /api/mpesa/stk-push` - Initiate STK push payment
- `POST /api/mpesa/callback` - M-Pesa payment callback

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `MPESA_CONSUMER_KEY` | M-Pesa API consumer key | Yes |
| `MPESA_CONSUMER_SECRET` | M-Pesa API consumer secret | Yes |
| `MPESA_PASSKEY` | M-Pesa Lipa Na M-Pesa passkey | Yes |
| `MPESA_SHORTCODE` | M-Pesa business shortcode | Yes |
| `MPESA_CALLBACK_URL` | M-Pesa payment callback URL | Yes |

## 📦 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon

### Frontend
- `pnpm dev` / `npm run dev` - Start development server
- `pnpm build` / `npm run build` - Build for production
- `pnpm preview` / `npm run preview` - Preview production build
- `pnpm lint` / `npm run lint` - Run ESLint

## 🎨 UI Components

The application uses:
- **Tailwind CSS** for styling
- **Radix UI** for accessible components (dialogs, etc.)
- **Lucide React** for icons
- Custom components:
  - `Navbar` - Navigation bar with cart and auth
  - `ProductCard` - Product display card
  - `Cart` - Shopping cart component
  - `AuthModal` - Login/Register modal
  - `STKModal` - M-Pesa payment modal

## 🔒 Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcrypt before storage
3. User logs in with email and password
4. Server validates credentials and issues JWT token
5. Token is stored in localStorage and sent with subsequent requests
6. Token expires after 7 days

## 💳 M-Pesa Integration

The application integrates with Safaricom's M-Pesa API for payment processing:

1. User initiates checkout
2. STK Push request is sent to M-Pesa
3. User receives prompt on their phone
4. User enters M-Pesa PIN to complete payment
5. Callback updates order status

## 🐛 Known Issues & Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo service mongod start`
- Check connection string in `.env`

### CORS Errors
- Backend is configured to accept all origins (`origin: "*"`)
- Update CORS settings in `server.js` for production

### M-Pesa Integration
- Ensure you have valid M-Pesa credentials
- Test in sandbox environment before production
- Verify callback URL is publicly accessible

## 📝 Development Notes

- Backend runs on port 5000 by default
- Frontend runs on port 5173 (Vite default)
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt with salt rounds
- MongoDB connection uses Mongoose ODM

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Set environment variables in hosting platform
2. Ensure MongoDB is accessible (MongoDB Atlas recommended)
3. Update CORS settings for production frontend URL

### Frontend Deployment (Vercel/Netlify)
1. Build the application: `pnpm build`
2. Update API base URL in `src/utils/api.js`
3. Deploy the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is part of the PLP MERN Stack July Cohort hands-on training.

## 👨‍💻 Author

PLP Academy - July Cohort

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy Coding! 🎉**

