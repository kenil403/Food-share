import React from 'react'
import ConString from '../ConnectionString';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import FeedCard from './FeedCard';
const FeedPage = () => {
  const [data, setdata] = useState([]);
  useEffect( () => {
    const getResponse = async()=>{
    try {
       const response  = await axios.get(
        `${ConString}/get_feed`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data.review);
      setdata(response.data.review || []);
    } catch (error) {
      console.error('Error fetching feed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to fetch feed. Please try again later.');
      }
      setdata([]);
    }
  }
  getResponse();
  }, []);
  return (
    <div className='grid p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 transition'>
      {data.map((ele) => (
        <FeedCard key={ele._id} name={ele.name} photo={`http://localhost:5000${ele.image}`} cityName={ele.city} description={ele.description} time={new Date(ele.updatedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false })} />)
      )}
    </div>
  )
}
// there will be a id for each feedcard component and that will be further be added when the response data is generated
export default FeedPage
