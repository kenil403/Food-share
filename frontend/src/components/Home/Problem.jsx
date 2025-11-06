import React from 'react'

function Problem() {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                    <div data-aos="zoom-in" className="text-center mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">The Problem</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Highlighting the global crisis of hunger and food wastage, emphasizing the urgent need for action.</p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="flex flex-row sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-5 flex-shrink-0">

                                <img style={{height:40}} src="/images/disease.svg" alt="disease" />

                            </div>
                            <div className="flex-grow">
                                {/* <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Shooting Stars</h2> */}
                                <p className="leading-relaxed text-base">Hunger claims more lives annually than AIDS, malaria, and terrorism combined, with a child dying every 10 seconds from hunger.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-5 flex-shrink-0">


                            <img style={{height:40}} src="/images/hunger.svg" alt="hunger" />

                            </div>
                            <div className="flex-grow">
                                {/* <h2 className="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2> */}
                                <p className="leading-relaxed text-base">82% of hungry individuals reside in countries with food surpluses, not shortages.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-5 flex-shrink-0">

                            <img style={{height:40}} src="/images/money.svg" alt="money" />


                            </div>
                            <div className="flex-grow">
                                {/* <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2> */}
                                <p className="leading-relaxed text-base">India annually wastes nearly 50,000 INR crores worth of food and ranks 2nd globally in household food wastage, behind China.</p>
                            </div>
                        </div>

                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-5 flex-shrink-0">

                            <img style={{height:40}} src="/images/waste.svg" alt="waste" />

                            </div>
                            <div className="flex-grow">
                                {/* <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2> */}
                                <p className="leading-relaxed text-base">Indian households discard 68.7 million tonnes of food annually, averaging 50 kgs per person.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Problem
