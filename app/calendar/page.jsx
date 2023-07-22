"use client"

import {useState} from 'react';
import Calendar from 'react-calendar'; 

function App() {
const [date, setDate] = useState(new Date())



return (
    <div className="app">
        <div className="calendar-container bg-white">
            <Calendar onChange={setDate} value={date}/>
        </div>
        <div className="text-center">
            Selected date: {date.toDateString()}
        </div>
    </div>
)

}

export default App;