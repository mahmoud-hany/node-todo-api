const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: { //default false
        type: Boolean,
        default: false
    },
    completedAt: { //default is time stamp
        type: Number,
        default: null
    },
});


module.exports = {Todo};