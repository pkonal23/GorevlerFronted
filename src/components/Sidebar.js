import React, { useState } from 'react'
import logo from '../images/logo.png'
import { IoHomeOutline } from "react-icons/io5";
import { LuFileSearch2 } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoMicCircleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import Addtask from './Addtask';
import AddVoicetask from './AddVoicetask';




function Sidebar({ onLogout }) {

    const hLogout=()=>{
        onLogout();
    }

    const [addTask, setAddTask] = useState(false);
    const [addVoiceTask, setAddVoiceTask] = useState(false);

    return (
        <>
            <div className='sidebar' >
                <div className='leftlogo'>
                    <img src={logo} style={{ height: '190px' }} />
                </div>
                <div className='sidebarlinks' >
                    <a href='/'><IoHomeOutline />    Home</a>
                    <a href='#search-here'><LuFileSearch2 />    Search</a>
                    
                    <a onClick={() => { setAddTask(true); console.log("Add Task Pressed"); }}><MdOutlinePostAdd />    Add Task</a>
                    <a onClick={() => { setAddVoiceTask(true); console.log("Add Voice Task Pressed"); }}><IoMicCircleOutline />    Speech</a>
                    <a href='/'><RiAccountCircleLine />    Account</a>
                    <br/><br/>
                    <a>
                    <button className='logout_link' onClick={hLogout} ><BiLogOut />    Log out</button>
                    </a>
                </div>
            </div>
            {addTask && <Addtask onClose={() => setAddTask(false)} />}
            {addVoiceTask && <AddVoicetask onClose={() => setAddVoiceTask(false)} />}

        </>
    )
}

export default Sidebar