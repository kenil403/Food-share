import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios';
import ConString from "../ConnectionString";
const Login = () => {
  const validate=async(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const role=document.getElementsByName('myRad');
    if(!role[0].checked && !role[1].checked && !role[2].checked){
      toast.error("Kindly specify your role");
      return false;
    }
    let myRole;
    if(role[0].checked){
      myRole=role[0].value;
    }
    else if(role[1].checked){
      myRole=role[1].value;
    }
    else if(role[2].checked){
      myRole=role[2].value;
    }
    console.log("entered");
    try {
      const { data } = await axios.post(
        `${ConString}/user/login`, 
        { email, role:myRole, password}, 
        {
          withCredentials: true,
          headers:{
            "Content-Type": "application/json"
          }
        }
      );
      console.log(data);
      sessionStorage.setItem('id',data.user._id);
      sessionStorage.setItem('type',data.user.role);
      toast.success("Logged in successfully");
      window.location.assign("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    return true;
  }
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen ">
      <div className='place-items-center grid w-4/5 grid-cols-1 grid-rows-1 md:grid-cols-2 mt-5 mb-5 lg:grid-cols-2'>

        <div className='blur-xl invisible flex md:visible lg:visible flex-row-reverse items-center justify-center md:blur-0 lg:blur-none'>
          
        <img src="/images/loginImg.png" className="" alt="loginImg" />
        </div>
        <div className="flex justify-center items-center">
          <section className='w-full'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
              <Link to="/" className="flex items-center mb-6 text-3xl font-semibold text-purple-600 underline">
              <img src="mealMission.svg" className="h-9 w-auto" alt="mealMission" />
              </Link>

              <div className="w-full bg-white rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-md xl:p-0 border-b-4 border-r-4 border-r-purple-600 border-b-purple-600">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Login to account
                  </h1>

                  <form method='post' className="space-y-4 md:space-y-6" onSubmit={validate}>
                  
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input id="helper-radio1" aria-describedby="helper-radio-text" type="radio" name="myRad" value="hotel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio1" className="font-medium text-gray-900 ">Hotel / Restaurant </label>

                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input id="helper-radio2" aria-describedby="helper-radio-text" type="radio" name="myRad" value="volunteer" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio2" className="font-medium text-gray-900 ">Volunteer</label>

                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input id="helper-radio3" aria-describedby="helper-radio-text" type="radio" name="myRad" value="admin" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio3" className="font-medium text-gray-900 ">Admin</label>

                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="name@company.com" required />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" name="password" id="password" pattern='(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}' placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required />
                      <p className='text-sm text-gray-400'>A password should contain atleast a capital letter, digit, special character. minimum length: 8.</p>
                    </div>
                    <button type="submit" className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                    <p className="text-sm font-light text-gray-500">
                      Don't have an account? <Link to="/SignUp" className="font-medium text-purple-600 hover:underline">SignUp here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
