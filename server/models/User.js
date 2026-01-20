const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:{ type: String, unique: true  },
    password: String,
    age: Number,
    address: String,
    work: String,
    salary: Number,
    phone:{ type: String, unique: true  },
    married: Boolean,
    horoscope: String,
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    photo: { type: String, default: 'https://via.placeholder.com/150' },

    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    approved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
