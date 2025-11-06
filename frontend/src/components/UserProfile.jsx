import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import ConString from "../ConnectionString";
import Loading from "./Layout/Loading";
import {toast} from 'react-toastify'
const UserProfile = (props) => {
    const [data, setdata] = useState(null);
    const [load,setLoad]=useState(false);

    useEffect(() => {
        //fetch data using session id
        setLoad(true);
        const fetchData = async () =>{
            await axios.get(
                `${ConString}/user/getuser/${sessionStorage.getItem('id')}`,
                {
                    withCredentials: true,
                    headers:{
                    "Content-Type": "application/json"
                    }
                }).then(res=>{
                setdata(res.data.user);
            }).catch(err=>{
                console.log(err); 
                if(!err.response.data.success){
                    toast.error("User is not authorized");
                }
            }).finally(
                ()=>setLoad(false)
            );
        }
        fetchData();
    }, []);
    return sessionStorage.getItem('id') ? (
        <div className="w-full flex items-center my-4  justify-center">
            {load && <Loading/>}
            {data!==null ? (
                <div className="bg-white max-w-full w-4/5  shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <span className="text-3xl mx-3 leading-6 font-medium text-gray-900">
                            {data.name.toUpperCase()||"Name"}
                        </span>
                        <span className="text-gray-500">-{data.role||"role"}</span>
                    </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="flex justify-center ">
                            <div className="  mt-8 sm:mt-12 w-4/5">
                                <dl className={data.role !== "hotel" ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "flex justify-center gap-4"}>
                                {data.role !== "hotel" ? (
                                    <div className="flex flex-col rounded-lg bg-purple-50 px-4 py-8 text-center w-[50%]">
                                        <dt className="order-last text-lg font-medium text-gray-500">Badge</dt>

                                        <dd className="text-4xl font-extrabold text-purple-600 md:text-5xl">{data.badge || "badge"}</dd>
                                    </div>
                                ) : 
                                null}
                                    <div className="flex flex-col rounded-lg bg-purple-50 px-4 py-8 text-center w-[50%]">
                                        <dt className="order-last text-lg font-medium text-gray-500">Points</dt>

                                        <dd className="text-4xl font-extrabold text-purple-600 md:text-5xl">{data.point || "point"}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="bg-gray-50 my-2 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.email||"email id"}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500">
                                Contact number
                            </dt>
                            <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.mobile||"number"}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500">
                                City
                            </dt>
                            <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.city||"city"}
                                </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-xl font-medium text-gray-500">
                                Age
                            </dt>
                            <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.age||"age"}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>) :
            (
                <span className="text-3xl m-3 leading-6 font-medium text-gray-900">Oops No data found</span>
            )}
        </div>
        ) :
        (
            toast.error("You are not logged in")
        );
};
export default UserProfile;
