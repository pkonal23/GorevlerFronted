import React, { useState } from 'react';
import Axios from 'axios';

function Addtask({ onClose }) {
    const currentDate = new Date().toLocaleDateString('en-CA');

    const [taskname, setTaskname] = useState('');
    const [taskdes, setTaskdes] = useState('');
    const [taskpriority, setTaskpriority] = useState('Medium'); // Default to "Medium"
    const [taskduedate, setTaskduedate] = useState(currentDate);

    const user_name = localStorage.getItem('stored_username');

    const addTaskToList = (event) => {
        event.preventDefault(); // Prevent form submission refresh

        const taskData = {
            task_name: taskname,
            task_des: taskdes,
            task_priority: taskpriority,
            task_duedate: taskduedate,
            username: user_name
        };

        console.log("Sending Task Data:", taskData);

        Axios.post("https://gorevlerbackend.onrender.com/addtask", taskData)
            .then(() => {
                console.log("Task added successfully");
                onClose(); // Close the modal after task is added
                window.location.reload(); // Refresh the page
            })
            .catch((error) => {
                console.error("Error adding task:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className='outteraddtask'>
            <div className='inneraddtask'>
                <form className='formaddtask' onSubmit={addTaskToList}>
                    <button type="button" className='closebtn' onClick={() => { onClose(); console.log("Close Pressed"); }}>x</button><br /><br />
                    <center><h1>Add New Task</h1></center>

                    <font>Task Name</font> 
                    <input type='text' value={taskname} onChange={(e) => setTaskname(e.target.value)} required />

                    <font>Task Description</font> 
                    <textarea className='taskdescription' value={taskdes} onChange={(e) => setTaskdes(e.target.value)} required />

                    <font>Task Priority</font> 
                    <select className='priorityselect' value={taskpriority} onChange={(e) => setTaskpriority(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <font>Due Date</font> 
                    <input type='date' className='duedate' value={taskduedate} onChange={(e) => setTaskduedate(e.target.value)} required />

                    <button className='addtaskbtn' type="submit">Add Task to the List</button>
                </form>
            </div>
        </div>
    );
}

export default Addtask;
