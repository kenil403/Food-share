import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 lg:px-20 py-10 md:flex-row flex-col items-center">
                    <div data-aos="fade-right" className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Connecting Hearts,
                            <br className="hidden lg:inline-block" />Nourishing Communities
                        </h1>
                        <p className="mb-8 leading-relaxed">Our mission addresses the critical issue of food waste by connecting volunteers with hotels and restaurants to redistribute surplus food to those in need, combating hunger and fostering community support.</p>
                        <div className="flex justify-center"><Link to='/feed'>
                            <button className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                                Feed
                            </button></Link>
                        </div>
                    </div>

                    <div data-aos="fade-left" className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" >
                        <img style={{ height: "28em" }} className="object-cover object-center rounded" alt="hero" src="/images/heroImg.png" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
