'use client'

import { useEffect, useState } from 'react';

function App() {
    const [clicked, setClicked] = useState(false);

    function handleClick(e) {
        e.preventDefault();
        setClicked(true);
    }

    return (
        <div>
            {/* QUESTION DIV START */}
            <h5 className='text-4xl text-center font-bold'>Respond to the text </h5>
            <div className='bg-white rounded-xl shadow-lg mx-80 mb-8 mt-11 p-8'>
                Q: "Hey, I know you said you can't come, but this isn't the first time i'm asking you to meet with my parents, and you keep on saying that you've got work. I'm starting to think that you're not serious about this relationship. I'm sorry if i'm being too harsh, but i'm just being honest."
            </div>
            {/* INPUT AND ENTER BUTTON START */}
            <div className='mx-44 mb-16'>
                <form className='flex justify-center mt-14 mx-36'>
                    <input className='w-3/4  px-8 py-2 font-medium border border-b-4 border-r-4 border-black rounded-lg shadow-lg hover:shadow-sm' type='text' placeholder='Say something about how things are going...' />
                    <button onClick={(e) => handleClick(e)} className='w-1/4 p-2 ml-2 border-black border-b-4 border-r-4 h-20 w-30 px-7  text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Send</button>
                </form>
                {/* RESULT DIV START */}

                {clicked ? (

                    <div className='bg-white rounded-xl shadow-lg mx-36 mb-8 mt-11 p-8 font-mono'>
                        <p>I would rate your response a 4/10. Here are the pros and cons:</p>
                        <b>Pros</b>
                        <p>● Acknowledgment of her concerns: You recognize that she feels you might not be serious about the relationship and address her feelings.</p>
                        <p>● Assurances of good intentions: You express that you are doing what you believe is best for the relationship.</p>
                        <b>Cons</b>
                        <p>● Lack of empathy: Your response lacks empathy and understanding for her feelings of frustration and disappointment.</p>
                        <p>● Vague promise: Saying "once I have the time we'll schedule it out" might sound non-committal and could leave her feeling uncertain aboutwhen it will actually happen.</p>
                        <p>● No reassurance of commitment: Your response does not provide clear reassurance of your commitment to meeting her parents.</p>
                        <p>To improve your response, consider being more empathetic, understanding, and specific in your assurances.</p>

                    </div>

                ) : (<></>)}




            </div>
        </div>
    );
}

export default App;
