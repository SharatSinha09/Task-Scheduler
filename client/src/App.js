import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    // Fetch tasks from the server
    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks/all')
            .then(response => {
                console.log('Fetched tasks:', response.data); // Check the data structure
                setTasks(response.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);
    


    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Please enter a valid task title.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/tasks/add', { 
                title, 
                description,
                priority, 
                completed: false
            });
            
            // Directly update the state with the new task
            setTasks((prevTasks) => [response.data, ...prevTasks]);
            setTitle('');
            setDescription('');
            setPriority(1);
        } catch (error) {
            console.error('Error adding task:', error.response ? error.response.data : error.message);
        }
    };
    
    
    

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Task Scheduler</h1>
            <div style={styles.formContainer}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    style={styles.input}
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={styles.input}
                />
                <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Math.min(Math.max(+e.target.value, 1), 10))}
                    placeholder="Priority"
                    style={styles.input}
                    min="1"
                    max="10"
                />
                <button onClick={addTask} style={styles.addButton}>Add Task</button>
            </div>
            <div style={styles.taskList}>
            {tasks.map((task) => (
    <div key={task._id} style={styles.taskCard(task.priority)}>
        <h3>{task.title || 'Untitled Task'}</h3>
        <p>Description: {task.description || 'No Description'}</p>
        <p>Priority: {task.priority}</p>
        <button onClick={() => deleteTask(task._id)} style={{ color: 'red' }}>Delete</button>
    </div>
))}

            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
    },
    header: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#333',
    },
    formContainer: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    taskList: {
        display: 'grid',
        gap: '12px',
        justifyContent: 'center',
        marginTop: '20px',
    },
    taskCard: (priority) => ({
        backgroundColor: '#fff',
        padding: '12px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${priority >= 8 ? 'red' : priority > 5 ? 'orange' : 'green'}`,
        width: '300px',
        margin: '10px auto',
        textAlign: 'left',
    }),
      
    deleteButton: {
        marginTop: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default App;
