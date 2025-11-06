import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import ConString from "../../ConnectionString";
// import "./styles.css";

const PostReview = () => {
  const { eleId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const validate = async (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const improvements = document.getElementById("improvements").value;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('review_post_image', selectedFile);
      formData.append('description', description);
      formData.append('improvements', improvements);
      //database
      try {
        const { data } = await axios.post(
          `${ConString}/volunteer/review_post/${eleId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(data);
        toast.success("Your memory is live now :)");
        window.location.assign("/Drives");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    return true;
  };

  return sessionStorage.getItem('id') ? (
    <div className="flex-col justify-center p-4 w-full ">
      <p className="text-center h1 text-4xl font-bold mt-12">Post Review</p>
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
                  htmlFor="description"
                  className="block mb-2 text-xl font-medium text-gray-900">
                  Description
                </label>
                <textarea type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Description" required />
              </div>
              {/* <p className='text-purple-500' onClick={appendFields}>Add more</p> */}

              <div className="md:grid md:grid-cols-2">
                <label
                  htmlFor="improvements"
                  className="block mb-2 text-xl font-medium text-gray-900">
                  Improvements
                </label>
                <input
                  type="text"
                  name="improvements"
                  id="improvements"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Improvements"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2">
                <label
                  htmlFor="review_post_image"
                  className="block text-xl font-medium text-gray-900">
                  Share Drive Memory  
                </label>
              </div>

              <input
                className=" h-10 w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 block p-1.5  focus:outline-none"
                multiple
                id="review_post_image"
                name="review_post_image"
                required
                type="file"
                onChange={handleFileChange}
              />

              <button
                type="submit"
                className="w-full text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center"
              >
                Share
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
  ) : toast.error("You are not logged in");;
};

export default PostReview;
