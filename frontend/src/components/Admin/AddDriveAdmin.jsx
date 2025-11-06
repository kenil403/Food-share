import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify';
import { TagsInput } from 'react-tag-input-component';
import axios from "axios";
import ConString from "../../ConnectionString";

const AddDriveAdmin = () => {
  const [selected, setselected] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const validate = async (e) => {
    e.preventDefault();
    const no_of_meals = document.getElementById("meals").value;
    const consent = document.getElementById("helper-radio2").checked;
    if (selected.length < 1) {
      toast.error("Atleast one food item should be there");
      return false;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('admin_drive_image', selectedFile);
      formData.append('food_name', selected);
      formData.append('no_of_meals', no_of_meals);
      formData.append('consent', consent);
      //database
      try {
        const { data } = await axios.post(
          `${ConString}/admin/drive_post`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(data);
        toast.success("Drive has been added successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
      return true;
  };
  return sessionStorage.getItem('id')?(
    <div className="flex-col justify-center p-4 w-full ">
      <p className="text-center h1 text-4xl font-bold mt-12">Add Drive</p>
      <div className="w-full my-5 flex justify-center">
        <div className="w-screen flex justify-center bg-white rounded-lg shadow drop-shadow-2xl md:mt-0 sm:max-w-full md:max-w-full sm:w-4/5 md:w-4/5 xl:p-0  border-l-4 border-l-purple-600 border-r-4 border-r-purple-600 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Add drive details
            </h1>
            <form
              method="post"
              onSubmit={validate}
              className="space-y-4 md:space-y-6"
              action="#">
              <div id="parent" className="md:grid md:grid-cols-2">
                <label
                  htmlFor="food"
                  className="block mb-2 text-xl font-medium text-gray-900">
                  Food{" "}
                </label>
                {/* <input type="text" name="food1" id="food1" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Rice" required /> */}
                <TagsInput
                  classNames="text-2xl"
                  id="food"
                  value={selected}
                  onChange={setselected}
                  name="fruits"
                  placeHolder="Enter food"
                />
              </div>
              {/* <p className='text-purple-500' onClick={appendFields}>Add more</p> */}
              <div className="md:grid md:grid-cols-2">
                <label
                  htmlFor="meals"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Meals
                </label>
                <input
                  type="number"
                  name="meals"
                  id="meals"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="10"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2">
                <label
                  htmlFor="meals"
                  className="block mb-2 text-xl font-medium text-gray-900">
                  Upload image
                </label>
              </div>

              <input
                className="block h-10 w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                multiple
                id="admin_drive_image"
                name="admin_drive_image"
                required
                type="file"
                onChange={handleFileChange}
              />

              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    id="helper-radio2"
                    required
                    aria-describedby="helper-radio-text"
                    type="checkbox"
                    name="myRad"
                    value="volunteer"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="ms-2 text-xl">
                  <label
                    htmlFor="helper-radio2"
                    className="font-medium text-gray-900 "
                  >
                    Consent
                  </label>
                  <p
                    id="helper-radio-text"
                    className="text-xs font-normal text-gray-500"
                  >
                    I hereby declare the food I will be distributing are fresh.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center"
              >
                Submit Application
              </button>
              <p className="text-xl font-light text-gray-500">
                Need help?{" "}
                <Link
                  to="/ContactUs"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Contact
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  </div>
  ):toast.error("You are not logged in");
}

export default AddDriveAdmin
