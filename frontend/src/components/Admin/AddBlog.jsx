import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { TagsInput } from 'react-tag-input-component';
import axios from "axios";
import ConString from "../../ConnectionString";

const AddBlog = () => {
    const handlePost = async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const topic = document.getElementById("topic").value;
        const url = document.getElementById("url").value;
        const message = document.getElementById("message").value;
        
            //database
            try {
                const { data } = await axios.post(
                    `${ConString}/admin/blog_post`,
                    {title,topic,url,message},
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                document.getElementById("title").value="";
                document.getElementById("topic").value="";
                document.getElementById("url").value="";
                document.getElementById("message").value="";
                toast.success("Post has been added successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
    };
    return sessionStorage.getItem('id') ? (

        <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            The Blog to be published should be authentic, accurate and verified.
                            It should have plagiarism-free content.
                            The platform reserves the right to review, edit, or remove any content that violates these guidelines or the platform's terms of service.
                        </p>

                        <div className="mt-8">
                        
                            <a className="text-2xl font-bold text-purple-500" href="mailto:smitdhimar9@gmail.com?subject=Enquiry&amp;">Send Email</a>
                            <address className="mt-2 not-italic">Vallabh Vidyanagar, Anand, 388120</address>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="#" className="space-y-4">
                            <div>
                                <label className="sr-only" htmlFor="name">Title</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Title"
                                    type="text"
                                    id="title"
                                />
                            </div>

                            
                                <div>
                                    <label className="sr-only" htmlFor="topic">Topic</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Topic"
                                        type="text"
                                        id="topic"
                                    />
                                </div>
                            
                                <div>
                                    <label className="sr-only" htmlFor="url">URL</label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="URL"
                                        type="text"
                                        id="url"
                                    />
                                </div>
                            




                            <div>
                                <label className="sr-only" htmlFor="message">Message</label>
                                <textarea
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Message"
                                    rows="8"
                                    id="message"
                                ></textarea>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit" 
                                    onClick={handlePost}
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Post Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    ) : toast.error("You are not logged in");
}

export default AddBlog
