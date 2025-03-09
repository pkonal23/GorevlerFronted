import React, { useState } from 'react';
import Axios from 'axios';
import img1 from '../images/mic.png';
import img2 from '../images/microphone.gif';
import axios from 'axios';

function AddVoicetask({ onClose }) {
    const currentDate = new Date().toISOString().split('T')[0]; // Ensure correct format: YYYY-MM-DD

    const [taskname, setTaskname] = useState('');
    const [taskdes, setTaskdes] = useState('');
    const [taskpriority, setTaskpriority] = useState('Medium');
    const [taskduedate, setTaskduedate] = useState(currentDate);
    const [showSecondImage, setShowSecondImage] = useState(false);

    const user_name = localStorage.getItem('stored_username') || "GuestUser"; // Ensure username is not null

    const addTaskToList = async (event) => {
        event.preventDefault();
    
        // Validate inputs before sending request
        if (!taskname.trim() || !taskdes.trim() || !taskpriority.trim() || !taskduedate.trim()) {
            console.error("Error: One or more required fields are missing.");
            alert("All fields are required!");
            return;
        }
    
        const taskData = {
            task_name: taskname.trim(),
            task_des: taskdes.trim(), // Fix: Rename task_description to task_des
            task_priority: taskpriority.trim(),
            task_duedate: taskduedate.trim(),
            username: user_name.trim()
        };
        
    
        console.log("📌 Sending Task Data:", taskData); // Log request payload
    
        try {
            const response = await Axios.post("https://gorevlerbackend.onrender.com/addtask", taskData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            console.log("✅ Task added successfully:", response.data);
            alert("Task added successfully!");
            onClose(); // Close modal after successful submission
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error("❌ Error adding task:", error.response ? error.response.data : error.message);
            alert(`Error adding task: ${error.response ? error.response.data.error : error.message}`);
        }
    };
    

    const startVoiceRecognition = (event) => {
        event.preventDefault();
        if (!window.webkitSpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        let recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-GB";
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log("Voice Recognition Result:", transcript);
            document.getElementById('voiceinput').value = transcript;
        };

        recognition.start();
        setShowSecondImage(true);

        recognition.onend = () => {
            setShowSecondImage(false);
            getTask();
        };
    };

    const parseApiResponse = (apiResponse) => {
        const taskData = {};
        
        // Normalize response: lowercase and remove extra spaces
        const normalizedResponse = apiResponse.toLowerCase().replace(/\s+/g, ' ').trim();
    
        // Extract values dynamically
        const taskNameMatch = normalizedResponse.match(/task name:\s*(.*?)(?=\s*task description:|task priority:|task due date:|$)/i);
        const taskDescMatch = normalizedResponse.match(/task description:\s*(.*?)(?=\s*task priority:|task due date:|$)/i);
        const taskPriorityMatch = normalizedResponse.match(/task priority:\s*(high|medium|low)/i);
        const taskDueDateMatch = normalizedResponse.match(/task due date:\s*(\d{4}-\d{2}-\d{2})/i);
    
        // Assign values safely with defaults
        taskData.taskname = taskNameMatch ? taskNameMatch[1].trim() : "Untitled Task";
        taskData.taskdescription = taskDescMatch ? taskDescMatch[1].trim() : "No Description";
        taskData.taskpriority = taskPriorityMatch ? taskPriorityMatch[1].trim() : "Medium";  // Default priority
        taskData.taskduedate = taskDueDateMatch ? taskDueDateMatch[1].trim() : new Date().toISOString().split('T')[0]; // Default to today
    
        // Update state
        setTaskname(taskData.taskname);
        setTaskdes(taskData.taskdescription);
        setTaskpriority(taskData.taskpriority);
        setTaskduedate(taskData.taskduedate);
    };
    
    const getTask = async () => {
        const voicetext = document.getElementById('voiceinput').value.trim();
        console.log("Voice Input:", voicetext);

        if (!voicetext) {
            console.error("No voice input detected.");
            return;
        }

        const pretext = "Give me response in this format: task name:  task description:  task priority: (High/Medium/Low), task duedate: (YYYY-MM-DD). ";
        try {
            const response = await axios.post("https://gorevlerbackend.onrender.com/gettask", { text: pretext + voicetext });
            const apiResponse = response.data.responseText;
            console.log("API Response:", apiResponse);
            parseApiResponse(apiResponse);
        } catch (error) {
            console.error("Error fetching task from API:", error);
        }
    };

    return (
        <div className='outteraddtask'>
            <div className='inneraddtask'>
                <form className='formaddtask' onSubmit={addTaskToList}>
                    <button type="button" className='closebtn' onClick={() => { onClose(); console.log("Close Pressed"); }}>x</button><br /><br />

                    <font>{showSecondImage ? 'Listening...' : 'Press mic...'}</font>
                    <textarea type='text' readOnly className='taskdescription1' id='voiceinput' />
                    <button className='roundbtn1' type='button' onClick={startVoiceRecognition}>
                        <img src={showSecondImage ? img2 : img1} style={{ height: '100px' }} alt="Mic" />
                    </button>

                    <font>Task Name</font>
                    <input type='text' value={taskname} onChange={(event) => setTaskname(event.target.value)} required />

                    <font>Task Description</font>
                    <textarea className='taskdescription' value={taskdes} onChange={(event) => setTaskdes(event.target.value)} required />

                    <font>Task Priority</font>
                    <select className='priorityselect' value={taskpriority} onChange={(event) => setTaskpriority(event.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <font>Due Date</font>
                    <input type='date' className='duedate' value={taskduedate} onChange={(event) => setTaskduedate(event.target.value)} required />

                    <button className='addtaskbtn' type="submit">Add Task to the List</button>
                </form>
            </div>
        </div>
    );
}

export default AddVoicetask;
