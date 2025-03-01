import React, { useState } from 'react';
import Taskcontainer from './Taskcontainer';
import { FaMicrophone } from "react-icons/fa";
import Addtask from './Addtask';
import AddVoicetask from './AddVoicetask';

function TaskArea({ searchQuery }) {
    const [addTask, setAddTask] = useState(false);
    const [addVoiceTask, setAddVoiceTask] = useState(false);

    // In Component B
    const usernameParts = localStorage.getItem('stored_username').split('~');
    const usernameToShow = usernameParts.length > 1 ? usernameParts[1] : ''; // Extract the part after ~
console.log(usernameToShow)


    return (
        <div className='taskarea'>
            <h2 style={{marginLeft:'2%', fontWeight:'900'}} >Welcome,{usernameToShow}</h2>
            <div className='taskareacontent'>
                <Taskcontainer searchQuery={searchQuery}/>
             
            </div>
            <div className='funcbtn'>
                <button className='roundbtn' onClick={() => { setAddTask(true); console.log("Add Task Pressed"); }}>+</button>
                <button className='roundbtn' onClick={() => { setAddVoiceTask(true); console.log("Add Voice Task Pressed"); }}><FaMicrophone /></button>

            </div>
            {addTask && <Addtask onClose={() => setAddTask(false)} />}
            {addVoiceTask && <AddVoicetask onClose={() => setAddVoiceTask(false)} />}
        </div>
    );
}

export default TaskArea;
