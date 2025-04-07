const TaskCard = ({ task }) => {
    // Properly handle and format date
    let formattedDate = 'No Date';
    if (task.createdAt) {
        try {
            formattedDate = new Date(task.createdAt).toLocaleString();
        } catch (error) {
            console.error('Error formatting date:', error);
        }
    }

    return (
        <div style={{ border: '1px solid #ddd', margin: '5px', padding: '10px' }}>
            <h3>{task.title || 'Untitled Task'}</h3>
            <p>{task.description || 'No Description'}</p>
            <p>Priority: {task.priority !== undefined ? task.priority : 'Not Set'}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
        </div>
    );
};

export default TaskCard;
