const express = require("express");
const app = express();
const cors = require("cors");
const Task = require("./models/tasks"); // Ensure this path is correct
const mongoose = require("mongoose");

// Middleware to parse JSON
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data

// Connecting to MongoDB
const dbUrl = "mongodb+srv://kuntumallavenkatasanjeeva2005:Sanjeeva%40123@nodetuts.gzjrr.mongodb.net/augmentixtodoapp?retryWrites=true&w=majority&appName=nodetuts";

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log("Listening on port 5000");
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Handle connection to the server
app.get("/", (req, res) => {
  console.log("Connected to server");
  // res.send("Hello");
});

// Get all tasks from the database
app.get("/alltasks", (req, res) => {
  Task.find().sort({ createdAt: -1 })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error retrieving tasks");
    });
});

// Upload task to the database (should be POST)
app.post("/upload/task", (req, res) => {

  // const { title, completionDate } = req.body;
  // console.log(title, completionDate);  // Check if they are undefined

  const taskObj = req.body;
  taskObj.isCompleted = false;
  taskObj.isEditing = false;
  const task = new Task(taskObj);

  task.save();
  // res.json(req.body);
  res.redirect("/")

});

// Update task in the database

app.put("/update/task/:id", (req, res) => {
  const taskId = req.params.id;
  // console.log(req.body)
  Task.findByIdAndUpdate(taskId, { isCompleted: req.body.isCompleted })
  .then(response => {
    res.json({ redirect: "/alltasks" });
  })
  .catch(err => console.log(err));
})

app.put("/update/:id", (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndUpdate(taskId, { title: req.body.title })
  .then(response => {
    res.json({ redirect: "/alltasks" });
  })
  .catch(err => console.log(err));
})

// Delete task from the database
app.delete("/task/delete/:id", (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((result) => {
      // res.send("Task Deleted Successfully!");
      res.json({ redirect: "/alltasks" })
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error deleting task");
    });
});
