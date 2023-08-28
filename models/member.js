const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    id: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 100,
    }
});

module.exports = mongoose.model('Member', memberSchema);