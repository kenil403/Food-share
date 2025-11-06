import React, { useState, useEffect } from 'react';
import ConString from "../../ConnectionString";
import axios from "axios";
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
function Feed() {
    const [activeDrives, setActiveDrives] = useState([]);
    const [completedDrives, setCompletedDrives] = useState([]);
    const consent=async(e)=>{
        const choice=window.confirm("Are you sure you want to join the drive?");
        if(choice)
        {
            await axios.get(
                `${ConString}/volunteer/join_drive/${e}`,
                {
                    withCredentials: true,
                    headers:{
                        "Content-Type": "application/json"
                    }
                }).then(res=>{
                toast.success(res.data.message)
            }).catch(err=>{
                console.log(err); 
                if(!err.response.data.success){
                    toast.error(err.response.data.message);
                }
            });
        }
    }
    useEffect(() => {
        const fetchData = async() => {
            try {
                const activeResponse = await axios.get(
                  `${ConString}/volunteer/my_drives_active`, 
                  {
                        withCredentials: true,
                        headers: {
                        "Content-Type": "application/json"
                        }
                  }
                );
                const completedResponse = await axios.get(
                    `${ConString}/volunteer/my_drives_inactive`, 
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                setActiveDrives(activeResponse.data.finalDrives);
                setCompletedDrives(completedResponse.data.finalDrives)
            }catch (error) {
                console.error('Error fetching data:', error);
                toast.error(error.response.data.message);
            }
        }
        fetchData();
    },[]);

     const generateActiveDrives = (ele) => {
       return (
                <a  key={ele._id} href="#" className="block border-l-4 border-l-purple-500  rounded-lg p-4 shadow-2xl shadow-indigo-100 mb-6">
                    <img
                        alt={ele.food_name}
                        src={`http://localhost:5000${ele.image}`}
                        className="h-40 w-full rounded-md object-cover mb-2"
                    />
                    <div>
                        <p className="font-medium">Posted By: {ele.p_name}</p>
                        <p className="font-medium">No. of meals: {ele.no_of_meals}</p>
                        <p className="font-medium">Address: {ele.address}, {ele.city}, {ele.pincode}</p>
                        <p className="font-medium">Posted At: {new Date(ele.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })}</p>
                        <button className='inline-flex text-white bg-purple-500 border-0 px-2 py-1 focus:outline-none hover:bg-purple-600 rounded my-1 text-md' onClick={()=>consent(ele._id)}>Join drive</button>
                    </div>
                </a>
          )
    };

    // Function to generate card elements for completed drives
    const generateCompletedDrives = (ele) => {
       
          return (      <a  key={ele._id}   className="block border-l-4 border-l-purple-500 rounded-lg p-4 shadow-2xl shadow-indigo-100 mb-6">
                    <img
                        alt=""
                        src={`http://localhost:5000${ele.image}`}
                        className="h-40 w-full rounded-md object-cover mb-2"
                   />
                   <div>
                        <p className="font-medium">Posted By: {ele.p_name}</p>
                        <p className="font-medium">No. of meals: {ele.no_of_meals}</p>
                        <p className="font-medium">Address: {ele.address}, {ele.city}, {ele.pincode}</p>
                        <p className="font-medium">Posted At: {new Date(ele.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })}</p>
                        <Link to={`/PostReview/${ele._id}`} >{!ele.posted && <button className='inline-flex text-white bg-purple-500 border-0 px-2 py-1 focus:outline-none hover:bg-purple-600 rounded my-1 text-md'>Share Memory</button>}</Link>
                    </div>
                    
                </a>
          )
    };


    return sessionStorage.getItem('id')?(<div className="container mx-auto px-4">
     
            <h1 className="text-3xl font-bold text-black my-8">Active Drives</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeDrives.map((ele)=>generateActiveDrives(ele))}
            </div>

            <h1 className="text-3xl font-bold text-black my-8">Completed Drives</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {completedDrives.map((ele)=>generateCompletedDrives(ele))}
            </div>
        </div>):toast.error("You are not logged in");
}

export default Feed;
