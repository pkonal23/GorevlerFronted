import React, { useEffect, useState } from 'react';
import Edittask from './Edittask';
import Axios from 'axios';
import { motion } from 'framer-motion';

function Taskcontainer({ searchQuery }) {
    const [data, setData] = useState([]);
    const [editedTaskId, setEditedTaskId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [longPressTimeout, setLongPressTimeout] = useState(null);

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const storedUsername = localStorage.getItem('stored_username');
            const response = await fetch(`https://gorevlerbackend.onrender.com/tasks?username=${storedUsername}`);
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const tasks = await response.json();
            setData(tasks);
        } catch (error) {
            console.error('❌ Error fetching tasks:', error.message);
        }
        setLoading(false);
    };

    const filteredData = data
        .filter((item) => item.task_name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => (a.task_status === 'Completed' ? -1 : 1)); // ✅ Completed tasks first

    const getPriorityColor = (priority) => {
        const colors = {
            Low: '#34A7FF',
            Medium: '#EFFE14',
            High: '#EC5766'
        };
        return colors[priority] || '#EC5766';
    };

    const deleteTask = async (taskId) => {
        if (!window.confirm("Do you really want to delete this task?")) return;

        try {
            const response = await Axios.delete(`https://gorevlerbackend.onrender.com/deltasks/${taskId}`);
            if (response.status === 200) {
                setData((prev) => prev.filter(task => task._id !== taskId));
                console.log("✅ Task Deleted!");
            } else {
                console.error('❌ Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('❌ Error deleting task:', error.message);
        }
    };

    const toggleTaskStatus = async (taskId) => {
        try {
            await Axios.put(`https://gorevlerbackend.onrender.com/tasksts/${taskId}`, {});
            setData((prev) => {
                return prev
                    .map(task =>
                        task._id === taskId
                            ? { ...task, task_status: task.task_status === 'Completed' ? 'Pending' : 'Completed' }
                            : task
                    )
                    .sort((a, b) => (a.task_status === 'Completed' ? -1 : 1)); // ✅ Resort tasks dynamically
            });
            console.log('✅ Task status updated!');
        } catch (error) {
            console.error('❌ Error updating task status:', error.message);
        }
    };

    // ✅ Handle Long Press for Mobile
    const handleTouchStart = (taskId) => {
        const timeout = setTimeout(() => {
            deleteTask(taskId);
        }, 800); // 800ms long-press duration

        setLongPressTimeout(timeout);
    };

    const handleTouchEnd = () => {
        if (longPressTimeout) {
            clearTimeout(longPressTimeout);
            setLongPressTimeout(null);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading tasks...</div>;
    }

    return (
        <>
            {filteredData.map((d) => (
                <motion.div 
                    key={d._id || d.task_id}
                    layout // ✅ Enables smooth animation on reorder
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }} // ✅ Spring animation
                >
                    <div 
                        className='taskcontainerbg' 
                        onDoubleClick={() => deleteTask(d._id || d.task_id)} // ✅ Desktop double-click
                        onTouchStart={() => handleTouchStart(d._id || d.task_id)} // ✅ Mobile long-press start
                        onTouchEnd={handleTouchEnd} // ✅ Mobile long-press cancel if released early
                        style={{ backgroundColor: d.task_status === 'Completed' ? '#d3d3d3' : 'transparent' }}
                    >
                        <div className='taskcontainerinnerbg' style={{ backgroundColor: d.task_status === 'Completed' ? '#d3d3d3' : '' }}>
                            <div className='taskpriority' style={{ backgroundColor: getPriorityColor(d.task_priority) }}></div>
                            <div className='taskinfo'>
                                <div className='taskname'>{d.task_name}</div>
                                <div className='taskDescription'>{d.task_des}</div>
                            </div>
                            <div className='taskstatusoutter'>
                                <button onClick={() => toggleTaskStatus(d._id || d.task_id)} className='taskstatusbtn'>
                                    {d.task_status}
                                </button>
                                {d.task_status !== 'Completed' && (
                                    <button onClick={() => setEditedTaskId(d._id || d.task_id)} className='taskstatusbtn'>
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {editedTaskId === (d._id || d.task_id) && (
                        <Edittask
                            taskId={d._id || d.task_id}
                            onClose={() => setEditedTaskId(null)}
                            taskName={d.task_name}
                            taskDes={d.task_des}
                            taskPriority={d.task_priority}
                        />
                    )}
                </motion.div>
            ))}
        </>
    );
}

export default Taskcontainer;
