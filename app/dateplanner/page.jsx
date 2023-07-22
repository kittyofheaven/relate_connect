'use client'

import React, {useState, useEffect} from 'react'







export default function page() {

    const [AiResult, setAiResult] = useState('')

    async function getAiResult(place, time){
        const cohere = require('cohere-ai');
        cohere.init('DWFkWRSVIoP2s9xHZE6i2JUjVRBKTaOAHx21u1PB'); // This is your trial API key
        (async () => {
        const response = await cohere.generate({
            model: '3ec3f15a-0b0a-479c-a479-bbaea8077153-ft',
            prompt: `make a summarized date plan at the vicinity of ${place} at ${time}`,
            max_tokens: 1564,
            temperature: 1,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });
        setAiResult(`${response.body.generations[0].text}`);
        })();
    }
    
    // getAiResult()
    
    useEffect(() => {
        // console.log(AiResult)
    }, [AiResult])


    function handleForm(e){
        e.preventDefault()
        getAiResult(e.target[0].value, e.target[1].value)
    }


return (
    <div>
        <form onSubmit={handleForm}>
            <input type="text" placeholder='place ? ex: Tunjungan'/>
            <input type="text" placeholder='time ? ex: 4pm' />
            <button type="submit">Create!</button>
        </form>
        <div>{AiResult}</div>
    </div>
)
}
