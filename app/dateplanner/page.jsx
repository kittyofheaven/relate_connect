'use client'

import React from 'react'

import axios from 'axios';

const options = {
method: 'POST',
url: 'https://api.cohere.ai/v1/generate',
headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer DWFkWRSVIoP2s9xHZE6i2JUjVRBKTaOAHx21u1PB'
},
data: {
    prompt: "Make a date plan based on data below : Place : Tunjungan Plaza Time : 12 am",
    model: 'base',
    max_tokens: 64,
    length: 200,
    temperature: 1,
}};

axios
.request(options)
.then(function (response) {
    console.log(response.data.generations[0]);
})
.catch(function (error) {
    console.error(error);
});



export default function page() {



return (
    <div>page</div>
)
}
