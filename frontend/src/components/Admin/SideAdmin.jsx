import React from 'react'
import { LiaBlogSolid } from "react-icons/lia";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from "axios";
import ConString from "../../ConnectionString";

const SideAdmin = () => {
  const logOut=async()=>{
    sessionStorage.clear();
    //database part
    try {
      const response = await axios.get(`${ConString}/user/logout`, 
      {
        withCredentials: true
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    window.location.assign("home");
  }
  return (
    <div className='h-full min-h-screen'>
      <div className="flex w-16 min-h-screen h-full flex-col justify-between border-e bg-white">
  <div>
    <div className="border-t border-gray-100">
      <div className="px-2">
        <ul className="space-y-1 mt-36 border-t border-gray-100 pt-4">
          <li className='my-4'>
            <Link
              to="/AddDriveAdmin"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
            <IoAddCircleOutline stroke='black' size={23}/>
              <span
                className="invisible absolute w-32 start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Add drive on behalf of third party
              </span>
            </Link>
          </li>
          
          <li className='my-4'>
            <Link
              to="/AddBlog"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
            <LiaBlogSolid stroke='black' size={23}/>
              <span
                className="invisible absolute w-32 start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Add Blogs
              </span>
            </Link>
          </li>



        </ul>
      </div>
    </div>
  </div>
  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
    <form action="#">
      <button
        type="button"
        onClick={logOut}
        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
        >
          Logout
        </span>
      </button>
    </form>
  </div>
</div>
    </div>
  )
}

export default SideAdmin;
