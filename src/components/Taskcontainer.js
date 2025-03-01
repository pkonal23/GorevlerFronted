import React, { useEffect, useState } from 'react';
import Edittask from './Edittask';
import Axios from 'axios';

function Taskcontainer({ searchQuery }) {
    const [data, setData] = useState([]);
    const [editedTaskId, setEditedTaskId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const storedUsername = localStorage.getItem('stored_username');
            const response = await fetch(`http://localhost:8080/tasks?username=${storedUsername}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const filteredData = data.filter((item) =>
        item.task_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Low': return '#34A7FF';
            case 'Medium': return '#EFFE14';
            case 'High': return '#EC5766';
            default: return '#EC5766';
        }
    };

    const deleteTask = async (taskId) => {
        const confirmBox = window.confirm("Do you really want to delete this task?");
        if (confirmBox) {
            try {
                console.log("Task ID:", taskId);
                const response = await Axios.delete(`http://localhost:8080/deltasks/${taskId}`);
                if (response.status === 200) {
                    console.log("✅ Task Deleted!");
                    fetchData();
                } else {
                    console.error('❌ Failed to delete task:', response.statusText);
                }
            } catch (error) {
                console.error('❌ Error deleting task:', error);
            }
        }
    };

    const toggleTaskStatus = async (taskId) => {
        try {
            await Axios.put(`http://localhost:8080/tasksts/${taskId}`, {});
            console.log('✅ Task status updated!');
            fetchData();
        } catch (error) {
            console.error('❌ Error updating task status:', error);
        }
    };

    const handleEdit = (taskId) => {
        console.log('✏️ Editing Task:', taskId);
        setEditedTaskId(taskId);
    };

    const closeEditTask = () => {
        console.log('❌ Closing Edit Modal');
        setEditedTaskId(null);
    };

    return (
        <>
            {filteredData.map((d) => (
                <div key={d._id || d.task_id}> {/* ✅ Fix: Ensure key is set properly */}
                    <div className='taskcontainerbg' onDoubleClick={() => deleteTask(d._id || d.task_id)}>
                        <div className='taskcontainerinnerbg'>
                            <div className='taskpriority' style={{ backgroundColor: getPriorityColor(d.task_priority) }}></div>
                            <div className='taskinfo'>
                                <div className='taskname'>{d.task_name}</div>
                                <div className='taskDescription'>{d.task_des}</div>
                            </div>
                            <div className='taskstatusoutter'>
                                <button onClick={() => toggleTaskStatus(d._id || d.task_id)} className='taskstatusbtn'>{d.task_status}</button>
                                <button onClick={() => handleEdit(d._id || d.task_id)} className='taskstatusbtn'>Edit</button>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Ensure only one edit modal appears */}
                    {editedTaskId === (d._id || d.task_id) && (
                        <Edittask
                            taskId={d._id || d.task_id}
                            onClose={closeEditTask}
                            taskName={d.task_name}
                            taskDes={d.task_des}
                            taskPriority={d.task_priority}
                        />
                    )}
                </div>
            ))}
        </>
    );
}

export default Taskcontainer;
