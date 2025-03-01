import React, { useState, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";


function Navbar({ onSearchChange }) {
    const [currentDateTime, setCurrentDateTime] = useState('');



    const handleInputChange = (event) => {
        const query = event.target.value;
        onSearchChange(query);
      };

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[date.getDay()];
            const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, ${dayOfWeek}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            setCurrentDateTime(timeString);
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <nav>
            <div className='navitems'>
                <div className='leftside'>
                    {currentDateTime}
                </div>
                <div className='rightside'>
                    <input className='searchinput' id='search-here' type='text' placeholder='🔍 Search tasks' onChange={handleInputChange}/>
                    <FaRegUserCircle /><RiArrowDropDownLine />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
