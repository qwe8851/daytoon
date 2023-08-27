const mongoose = require('mongoose');

// title(책제목), author(저자), volumes(권수), completed(완결여부), genre(장르),
// update(업데이트 일자), row(책장), column(칸), note1(비고1), note2(비고2), 

const mainSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 80,
    },
    author: {
        type: String,
        required: true, // 필수 필드로 지정
        minlength: 1,
        maxLength: 80,
    },
    volumes: {
        type: Number,
        min: 1,
        max: 5000,
        default: 1,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        minlength: 1,
        maxLength: 20,
        default: "기타",
    },
    update: {
        type: String,
    },
    row: {
        type: Number,
        required: true, // 필수 필드로 지정
        min: 1,
        max: 500,
    },
    column: {
        type: Number,
        required: true, // 필수 필드로 지정
        min: 1,
        max: 50,
    },
    note1: {
        type: String,
        minlength: 1,
        maxLength: 100,
    },
    note2: {
        type: String,
        minlength: 1,
        maxLength: 100,
    }
});


mainSchema.statics.findAll = function () {
    return this.find();
};

module.exports = mongoose.model('Main', mainSchema);