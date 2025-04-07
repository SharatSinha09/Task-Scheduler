const express = require('express');
const Task = require('../models/taskModel');
const PriorityQueue = require('js-priority-queue');
const router = express.Router();

const taskQueue = new PriorityQueue({
    comparator: (a, b) => b.priority - a.priority  // Higher priority first
});

// Add a new task
router.post('/add', async (req, res) => {
    try {
        const { title, description, priority, completed } = req.body;
        const newTask = new Task({ 
            title: title || 'Untitled Task', 
            description: description || 'No Description',
            priority: priority || 1, 
            completed: completed || false, 
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).send({ message: 'Error adding task', error });
    }
});


// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting task', error });
    }
});


// Get all tasks
// Get all tasks sorted by priority
router.get('/all', async (req, res) => {
    try {
        const tasks = await Task.find();

        // Enqueue all tasks into the priority queue
        tasks.forEach(task => taskQueue.queue(task));

        // Dequeue to get sorted tasks
        const sortedTasks = [];
        while (taskQueue.length > 0) {
            sortedTasks.push(taskQueue.dequeue());
        }

        res.status(200).send(sortedTasks);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks', error });
    }
});


module.exports = router;
