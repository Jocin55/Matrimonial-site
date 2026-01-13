const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:{ type: String, unique: true  },
    password: String,
    age: Number,
    address: String,
    work: String,
    salary: Number,
    isarried: Boolean,
    horoscope: String,

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
