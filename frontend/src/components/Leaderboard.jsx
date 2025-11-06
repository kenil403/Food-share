import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from './Layout/Loading'
import ConString from "../ConnectionString";
const LeaderBoard = (props) => {


    const [load,setLoad]=useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoad(true);
        axios.get(`${ConString}/get_users`, {
            withCredentials: true
        }).then(res => {
            setData(res.data.user || []);
            console.log(res);
        }).catch(err => {
            console.error('Error fetching leaderboard:', err);
            setData([]);
        }).finally(()=>setLoad(false));

    }, []);

    return (
        <div>
            {load && <Loading/>}
            <div className="flex items-center justify-center">
                <div className="flex-col w-4/5">
                    <p className="text-center h1 text-4xl font-bold mt-12">Leader Board</p>
                    <p className="text-center my-4 h4 text-xl mt-12">
                        Statistics of people who are enrolled in the activity of helping people
                    </p>
                    <div className="relative overflow-x-auto shadow-2xl backdrop-blur-sm sm:rounded-xl">
                        <table className="w-full border-l-4 border-r-4 border-r-purple-500 border-l-purple-500 text-lg text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xl my-4  text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        City
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Badge
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Drives completed
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map((ele, key) => (
                                    <tr key={key} className={`odd:bg-opacity-30 hover:bg-gray-200 hover:bg-opacity-50 even:bg-opacity-30 my-2`}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {ele.name}
                                        </th>

                                        <td className="px-6 py-4">
                                            {ele.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            {ele.badge}
                                        </td>
                                        <td className="px-6 py-4">
                                            {ele.ndrive}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            No volunteers to display yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
