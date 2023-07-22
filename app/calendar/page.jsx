'use client'

import { useState } from 'react';

function App() {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <div className='bg-white rounded-xl shadow-lg mx-80 mb-8'>
                <div className='p-5 flex flex-col '>
                    {/* TITLE START */}
                    <h5 className='text-2xl font-medium mt-3 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'> Valentine's Date !</h5>
                    {/* TITLE END */}

                    {/* DATE START */}
                    <p className=' font-mono text-xl mt-5'>14 February, 2023</p>
                    <p className='mt-3'>
                        On this special day, I want you to know that my love for you knows no bounds. You are the most incredible person I've ever known, and I feel blessed to call you mine. Thank you for being the amazing, caring, and loving partner that you are.Here's to many more Valentine's Days and a lifetime of love with you by my side. I love you more than words can express.<br />
                    </p>
                    {/* DATE END */}
                </div>
            </div>
            {/* BAGIAN PARTNER END */}

            <div className='bg-white rounded-xl shadow-lg mx-80 mb-8'>
                <div className='p-5 flex flex-col '>
                    {/* TITLE START */}
                    <h5 className='text-2xl font-medium mt-3 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'> Halloween Date !</h5>
                    {/* TITLE END */}

                    {/* DATE START */}
                    <p className=' font-mono text-xl mt-5'>31 October, 2023</p>
                    <p className='mt-3'>
                        You're my favorite treat and the most bewitching person in my life. I'm lucky to have you, not just on Halloween, but every day. Let's make this Halloween date one for the books! Wishing you a night full of magic and fun! <br />
                    </p>
                    {/* DATE END */}
                </div>
            </div>
            {/* BAGIAN PARTNER END */}

            <div className='bg-white rounded-xl shadow-lg mx-80 mb-8'>
                <div className='p-5 flex flex-col '>
                    {/* TITLE START */}
                    <h5 className='text-2xl font-medium mt-3 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'> Anniversary Date !</h5>
                    {/* TITLE END */}

                    {/* DATE START */}
                    <p className=' font-mono text-xl mt-5'>3 November, 2023</p>
                    <p className='mt-3'>
                        Happy second anniversary to the person i admire the most! may our relationship grows stronger and i wish to always be there for you. <br />
                    </p>
                    {/* DATE END */}
                </div>
            </div>
            {/* BAGIAN PARTNER END */}


            <div className='bg-white rounded-xl shadow-lg mx-80 mb-8'>
                <div className='p-5 flex flex-col '>
                    {/* TITLE START */}
                    <h5 className='text-2xl font-medium mt-3 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'> Christmas Date !</h5>
                    {/* TITLE END */}

                    {/* DATE START */}
                    <p className=' font-mono text-xl mt-5'>25 December, 2023</p>
                    <p className='mt-3'>
                        Merry Christmas, my love! Wishing you a day filled with joy, love, and warmth. You bring so much happiness into my life, and I'm grateful for every moment we share together. May this holiday season be a time of togetherness and beautiful memories. <br />
                    </p>
                    {/* DATE END */}
                </div>
            </div>
            {/* BAGIAN PARTNER END */}

        </div>
    );
}

export default App;