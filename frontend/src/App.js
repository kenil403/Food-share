import AOS from 'aos' ;
import "aos/dist/aos.css"
import React, { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Feed from './components/Volunteers/Feed';
import Error from './components/NotFound/Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from './components/Layout/PopUp';
import Loading from './components/Layout/Loading';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './components/SignUp';
import LeaderBoard from './components/Leaderboard';
import PageNotFound from './components/NotFound/NotFound';
import VolunteerReport from './components/Volunteers/GetReportForCustomer';
import SidebarVol from './components/Volunteers/SideVolunteer';
import SideHotel from './components/Hotels/SideHotel';
import SideAdmin from './components/Admin/SideAdmin';
import UserProfile from './components/UserProfile';
import GetReport from './components/Hotels/GetReport';
import AddDrive from './components/Hotels/AddDrive';
import Bubbles from './components/Layout/Bubbles';
import FeedCard from './components/FeedCard';
import FeedPage from './components/FeedPage';
import AddDriveAdmin from './components/Admin/AddDriveAdmin';
import PostReview from './components/Volunteers/PostReview';
import  ScholarshipProvider from './context/main';
import Blog from './components/Blog' ;
import AddBlog from './components/Admin/AddBlog';
import Index from './pages/community/index'
let userTypeFromSession = sessionStorage.getItem('type');
function App() {
  useEffect(() => {
    AOS.init({
      duration:1000,
      easing: 'ease-out-cubic'
    });
  },[]);

  return (
    <div id="MainContent" className='bg-gray-50  flex flex-col'>
      <div>
        <Navbar />
      </div>
      <Bubbles />
      <div className='flex-grow flex-row mt-16 min-h-screen  max-h-full' style={{ zIndex: 4 }}>
        <div className='flex w-full'>
          <div>
            {userTypeFromSession === "volunteer" ? <SidebarVol /> : userTypeFromSession === "hotel" ? <SideHotel /> : userTypeFromSession === "admin" ? <SideAdmin /> : null}
          </div>
          <div className='w-full' >
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ScholarshipProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path='/UserProfile' element={<UserProfile />} />
              <Route path="/LeaderBoard" element={<LeaderBoard />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/GetReport" element={<GetReport />} />
              <Route path='/adddrive' element={<AddDrive />} />
              <Route path='/PostReview' element={<PostReview />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/Drives" element={<Feed />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path="/VolunteerReport" element={<VolunteerReport />} />
              <Route path="/AddDriveAdmin" element={<AddDriveAdmin />} />
              <Route path="/AddBlog" element={<AddBlog />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/community" element={<Index/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            </ScholarshipProvider>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
