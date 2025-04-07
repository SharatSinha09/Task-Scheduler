const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, default: 'Untitled Task' },
    description: { type: String, default: '' },
    priority: { type: Number, default: 1 },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
