const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a skill title']
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        default: 'General'
    },
    description: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
