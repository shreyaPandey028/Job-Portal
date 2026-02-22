# JobPortal 💼

A modern **MERN Stack** job portal application that connects talented professionals with job opportunities. Built with React, Node.js, Express, and MongoDB.

---

## 🚀 Features

✅ **User Authentication** - Secure login/signup with JWT  
✅ **Job Listings** - Browse and filter job opportunities  
✅ **Job Applications** - Apply for jobs with one click  
✅ **Admin Dashboard** - Post jobs, manage companies, view applications  
✅ **Company Management** - Create and manage company profiles  
✅ **Profile Management** - Update user profile and CV  
✅ **Real-time Notifications** - Get updates on application status  
✅ **Responsive Design** - Works seamlessly on all devices  
✅ **Cloud Storage** - Resume uploads powered by Cloudinary  

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Fast build tool
- **Redux** - State management
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **ShadCN UI** - Component library
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Cloudinary** - Cloud storage
- **Bcrypt** - Password hashing

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Cloudinary account (for file uploads)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/shreyaPandey028/Job-Portal.git
cd jobportal
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend folder (if needed):
```env
VITE_API_URL=http://localhost:8000/api
```

Start frontend server:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`  
Backend runs on: `http://localhost:8000`

---

## 📁 Project Structure

```
jobportal/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── redux/           # Redux slices
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
│
├── backend/                  # Node.js API
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middlewares
│   └── utils/               # Utility functions
│
└── README.md                # Project documentation
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/profile` - Get user profile

### Jobs
- `GET /api/job/get-all` - Get all jobs
- `GET /api/job/:id` - Get job details
- `POST /api/job/create` - Create new job (admin)
- `PUT /api/job/:id` - Update job (admin)

### Applications
- `POST /api/application/apply` - Apply for job
- `GET /api/application/get` - Get applications

### Companies
- `POST /api/company/register` - Create company
- `GET /api/company/get-all` - Get all companies
- `GET /api/company/:id` - Get company details

---

## 🚢 Deployment

### Frontend - Vercel
1. Connect your GitHub repository to Vercel
2. Select the `frontend` folder as root directory
3. Set environment variables if needed
4. Deploy automatically on every push

### Backend - Render
1. Create new service on Render
2. Connect your GitHub repository
3. Set environment variables (MONGO_URI, JWT_SECRET, etc.)
4. Deploy from `backend` folder
5. Auto-redeploy on GitHub push

---

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal
PORT=8000
JWT_SECRET=your_secret_key_here
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

---

## 🎯 User Roles

### Job Seeker
- Browse job listings
- Apply for jobs
- Manage applications
- Update profile and CV

### Employer/Admin
- Post job listings
- Manage job postings
- View applicants
- Manage company profile

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Authors

**Shreya Pandey**  
GitHub: [@shreyaPandey028](https://github.com/shreyaPandey028)

**Priyanshu Tiwari** 
GitHub: [@PriyanshuCybro](https://github.com/PriyanshuCybro)

---

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TailwindCSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)

---

**Happy coding! 🚀**
