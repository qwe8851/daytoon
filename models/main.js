const mongoose = require('mongoose');

// title(책제목), author(저자), volumes(권수), completed(완결여부), genre(장르),
// update(업데이트 일자), row(책장), column(칸), note1(비고1), note2(비고2), 

const mainSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 100,
    },
    author: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 100,
    },
    volumes: {
        type: Number,
        min: 0,
        max: 5000,
        default: 0,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: Number,
        min: 0,
        max: 15,
        default: 0,
    },
    update: {
        type: String,
    },
    row: {
        type: Number,
        required: true, // 필수 필드로 지정
        min: 0,
        max: 500,
    },
    column: {
        type: Number,
        required: true, // 필수 필드로 지정
        min: 0,
        max: 500,
    },
    note1: {
        type: String,
        maxLength: 50,
    },
    note2: {
        type: String,
        maxLength: 50,
    },
    description: {
        type: String,
        maxLength: 5000,
    }
});


mainSchema.statics.findAll = function () {
    return this.find();
};

module.exports = mongoose.model('Main', mainSchema);