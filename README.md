# Meal Mission

Meal Mission is a platform dedicated to combating food waste, supporting communities in need, and promoting sustainability. Our project aims to bridge the gap between surplus food providers, volunteers, and those facing food insecurity, leveraging technology to facilitate efficient redistribution of surplus food.

## Inspiration

The inspiration for Meal Mission came from a profound realization of the immense food waste occurring daily, juxtaposed with the prevalence of hunger in many communities. We were moved to take action and create a solution that addresses these pressing issues while promoting community collaboration and empowerment.

## Features

- **Community Collaboration:** Bring together food establishments and volunteers to facilitate surplus food distribution.
- **Recognition and Incentives:** Reward volunteers with badges and incentives to drive engagement and recognize contributions.
- **Data-Driven Insights:** Provide detailed analytics to monitor food distribution efforts and drive progress.
- **Community Engagement:** Foster interaction and support among stakeholders with dedicated chat functionality.
- **Awareness and Education:** Raise awareness on food wastage, sustainability, and community impact through curated blogs.
- **User-Friendly Interface:** Ensure ease of use with a user-friendly interface for posting drives and accessing information.
- **Drive Posting by Owners:** Enable owners to post surplus food drives and prevent wastage in their localities.
- **Volunteer Notifications:** Instant notifications inform volunteers about available drives, boosting participation.
- **Drive Acceptance and Distribution:** Enable volunteers to efficiently accept and distribute surplus food to those in need.
- **Detailed Analysis Reports:** Provide comprehensive reports to facilitate waste minimization and maximize impact.
- **Awareness Blog Section:** Admin-curated blogs promote education and action against food wastage.
- **Partnerships with NGOs and Organizations:** Collaborate with NGOs and organizations to strengthen support networks and amplify community efforts.

## Technology Stack

- **Frontend:** ReactJs, TailwindCSS
- **Backend:** ExpressJs, NodeJs
- **Database:** MongoDB
- **Security:** JWT

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create environment file: `cp .env.example .env`
4. Configure your `.env` file with:
   - MongoDB connection string
   - JWT secret key
   - Email credentials (for OTP functionality)
   - Frontend URL
5. Start the development server: `npm run dev` (or `npm start` for production)

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. (Optional) Create environment file: `cp .env.example .env`
4. Start the development server: `npm start`

The frontend will run on `http://localhost:3000`

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/foodshare
FRONTEND_URL=http://localhost:3000
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

## Demo

<video src="https://drive.google.com/file/d/1EA8RJhxYTc7mObII1GrimFgHrA4Oqqvc/view" controls title="Title"></video>
alternative links : [https://streamable.com/hdwzuu](https://drive.google.com/file/d/1EA8RJhxYTc7mObII1GrimFgHrA4Oqqvc/view)
