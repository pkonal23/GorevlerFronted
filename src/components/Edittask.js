import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Edittask({ onClose, taskId, taskName, taskDes, taskPriority }) {
    const currentDate = new Date().toLocaleDateString('en-CA');

    const [taskname, setTaskname] = useState(taskName || '');
    const [taskdes, setTaskdes] = useState(taskDes || '');
    const [taskpriority, setTaskpriority] = useState(taskPriority || 'Medium');
    const [taskduedate, setTaskduedate] = useState(currentDate);

    useEffect(() => {
        console.log("Editing Task ID:", taskId); // ✅ Debugging log
        if (!taskId) {
            console.error("❌ Task ID is undefined, cannot fetch task!");
            return;
        }
    
        Axios.get(`https://gorevlerbackend.onrender.com/task/${taskId}`)
            .then(res => {
                if (res.data.length === 0) {
                    console.error("❌ Task not found!");
                    return;
                }
                const taskData = res.data[0];
                setTaskname(taskData.task_name);
                setTaskdes(taskData.task_des);
                setTaskpriority(taskData.task_priority);
                setTaskduedate(taskData.task_duedate);
            })
            .catch(err => console.log(err));
    }, [taskId]);
    

    const addEditedTaskToList = () => {
        if (!taskId) {
            console.error("Invalid Task ID");
            return;
        }
    
        Axios.put(`https://gorevlerbackend.onrender.com/edittask/${taskId}`, {
            task_name: taskname,
            task_des: taskdes,
            task_priority: taskpriority,
            task_duedate: taskduedate
        })
        .then(() => {
            console.log("Task Edited Successfully");
            onClose();
            window.location.reload(); // Refresh the page
        })
        .catch(error => {
            console.error("Error editing task:", error);
        });
    };
    

    return (
        <div className='outteraddtask'>
            <div className='inneraddtask'>
                <form className='formaddtask' onSubmit={(e) => e.preventDefault()}>
                    <button type="button" className='closebtn' onClick={() => { onClose(); console.log("Close Pressed"); }}>x</button>
                    <br /><br />

                    <center><h1>Edit Task Details</h1></center>

                    <label>Task Name</label>
                    <input type='text' value={taskname} onChange={(event) => setTaskname(event.target.value)} required />

                    <label>Task Description</label>
                    <textarea className='taskdescription' value={taskdes} onChange={(event) => setTaskdes(event.target.value)} required />

                    <label>Task Priority</label>
                    <select className='priorityselect' value={taskpriority} onChange={(event) => setTaskpriority(event.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <label>Due Date</label>
                    <input type='date' className='duedate' value={taskduedate} onChange={(event) => setTaskduedate(event.target.value)} required />

                    <button type="button" className='addtaskbtn' onClick={addEditedTaskToList}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default Edittask;
