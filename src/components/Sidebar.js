// import React from 'react';
// import logo from '../images/logo.png';
// import { IoHomeOutline, IoMicCircleOutline } from "react-icons/io5";
// import { LuFileSearch2 } from "react-icons/lu";
// import { MdOutlinePostAdd } from "react-icons/md";
// import { RiAccountCircleLine } from "react-icons/ri";
// import { BiLogOut } from "react-icons/bi";

// function Sidebar({ onLogout, setAddTask, setAddVoiceTask }) {
//     return (
//         <>
//             <div className='sidebar'>
//                 <div className='leftlogo'>
//                     <img src={logo} style={{ height: '190px' }} alt="Logo" />
//                 </div>
//                 <div className='sidebarlinks'>
//                     <a href='/'><IoHomeOutline /> Home</a>
//                     <a href='#search-here'><LuFileSearch2 /> Search</a>
//                     <a onClick={() => { setAddTask(true); console.log("Add Task Pressed"); }}>
//                         <MdOutlinePostAdd /> Add Task
//                     </a>
//                     <a onClick={() => { setAddVoiceTask(true); console.log("Add Voice Task Pressed"); }}>
//                         <IoMicCircleOutline /> Speech
//                     </a>
//                     <a href='/'><RiAccountCircleLine /> Account</a>
//                     <br /><br />
//                     <a>
//                         <button className='logout_link' onClick={onLogout}>
//                             <BiLogOut /> Log out
//                         </button>
//                     </a>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { IoHomeOutline, IoMicCircleOutline } from "react-icons/io5";
import { LuFileSearch2 } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; // Close icon

function Sidebar({ onLogout, setAddTask, setAddVoiceTask }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update mobile state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Show hamburger only for mobile */}
            {isMobile && (
                <div className="hamburger" onClick={toggleSidebar}>
                    <GiHamburgerMenu size={30} />
                </div>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isOpen || !isMobile ? "open" : ""}`}>
                {/* Close Button (Only for Mobile) */}
                {isMobile && (
                    <button className="close-btn" onClick={toggleSidebar}>
                        <AiOutlineClose size={25} />
                    </button>
                )}

                <div className='leftlogo'>
                    <img src={logo} style={{ height: '190px' }} alt="Logo" />
                </div>
                <div className='sidebarlinks'>
                    <a href='/'><IoHomeOutline /> Home</a>
                    <a href='#search-here'><LuFileSearch2 /> Search</a>
                    <a onClick={() => { setAddTask(true); console.log("Add Task Pressed"); }}>
                        <MdOutlinePostAdd /> Add Task
                    </a>
                    <a onClick={() => { setAddVoiceTask(true); console.log("Add Voice Task Pressed"); }}>
                        <IoMicCircleOutline /> Speech
                    </a>
                    <a href='/'><RiAccountCircleLine /> Account</a>
                    <br /><br />
                    <a>
                        <button className='logout_link' onClick={onLogout}>
                            <BiLogOut /> Log out
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
