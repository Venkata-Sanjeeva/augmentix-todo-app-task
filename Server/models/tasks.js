const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isEditing: {
        type: Boolean,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

// using this line is needed to search in the database like we just previously created the blogs collection in the db

// the passing argument is type correctly because it adds plural form of the word and it search for it in the DB
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;