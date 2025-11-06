import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import ConString from "../ConnectionString";
const Signup = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const role = document.getElementsByName('myRad');
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById("age").value;
    const city = document.getElementById('city').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('confirm-password').value;
    const pincode = document.getElementById('pincode').value;
    let myRole;

    if (password !== cpassword) {
      toast.error("Confirm password does not match");
      return false;
    }
    if (!role[0].checked && !role[1].checked) {
      toast.error("Kindly specify your role");
      return false;
    }
    if (role[0].checked) {
      myRole = role[0].value;
    }
    else {
      myRole = role[1].value;
    }
    // database connectivity
    try {
      const { data } = await axios.post(
        `${ConString}/user/register`,
        { role: myRole, name, mobile: phone, email, age, address, pincode, city, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      toast.success(data.message);
      window.location.assign("/login");
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed. Please check your input and try again.');
      }
    }
    return true;
  }
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen ">
      <div className='grid w-4/5 grid-cols-1 grid-rows-1 md:grid-cols-2 mt-5 mb-5 lg:grid-cols-2'>
        <div className="flex justify-center items-center">

          <section className='w-full'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
              <Link to="/" className="flex items-center mb-6 text-3xl font-semibold text-purple-600 underline">
                <img src="mealMission.svg" className="h-9 w-auto" alt="mealMission" />
              </Link>
              <div className="w-full bg-white rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-md xl:p-0 border-b-4 border-l-4 border-l-purple-600 border-b-purple-600">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Create an account
                  </h1>
                  <form method='post' onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input id="helper-radio1" aria-describedby="helper-radio-text" type="radio" name="myRad" value="hotel" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio1" className="font-medium text-gray-900 ">Hotel / Restaurant </label>
                        <p id="helper-radio-text" className="text-xs font-normal text-gray-500">

                          Donate food wastage help the poor communities
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center h-5">
                        <input id="helper-radio2" aria-describedby="helper-radio-text" type="radio" name="myRad" value="volunteer" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-radio2" className="font-medium text-gray-900 ">Volunteer</label>
                        <p id="helper-radio-text" className="text-xs font-normal text-gray-500">
                          Help distributing food to needy people
                        </p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="name@company.com" required />
                    </div>

                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="name" required />
                    </div>
                    <div>
                      <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                      <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="name" required />
                    </div>
                    <div className='flex gap-2 flex-row'>
                      <div className='w-1/2 '>
                        <label htmlFor="number" className="block mb-2 text-sm font-medium  text-gray-900">Contact number</label>
                        <input type="number" pattern='[0-9]{10}' name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="7887878418" required />
                      </div>
                      <div className='w-1/2'>
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Your age</label>
                        <input type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="e.g. 45" min={15} max={110} required />
                      </div>
                    </div>
                    <div className='flex gap-2 flex-row'>

                      <div className='w-1/2'>
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Your city</label>
                        <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="e.g. Mumbai" required />
                      </div>
                      <div className='w-1/2'>
                        <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Pincode</label>
                        <input type="number" name="pincode" id="pincode" pattern='[1-9]{1}[0-9]{5}' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="e.g.400001" required />
                      </div>
                    </div>

                    {/* <label className='block mb-2 text-sm font-medium text-gray-900'>Your role</label> */}
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                      <input type="password" pattern='(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}' name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required />
                      <p className='text-sm text-gray-400'>A password should contain atleast a capital letter, digit, special character. minimum length: 8.</p>
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                      <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required />
                    </div>

                    <button type="submit" className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                    <p className="text-sm font-light text-gray-500">
                      Already have an account? <Link to="/Login" className="font-medium text-purple-600 hover:underline">Login here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className='blur-xl invisible flex md:visible lg:visible flex-row-reverse items-center justify-center md:blur-0 lg:blur-none'>
          <img src="/images/signUpImg.png" className="" alt="signupImg" />
          <div />
        </div>
      </div>
    </div>
  );
}

export default Signup;
