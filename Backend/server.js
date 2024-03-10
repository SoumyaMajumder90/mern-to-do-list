const express = require('express')
var app = express()
const port = 3001
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList") 
app.use(cors()); 
app.use(express.json()); 

const mongoURI = 'mongodb+srv://soumyamajumdersm90:q2e4t6u8i9@cluster0.fsfy3gc.mongodb.net/Todo';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
console.log('Before MongoDB connection attempt');

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.get("/getTodoList", (req, res) => { 
    TodoModel.find({}) 
        .then((todoList) => res.json(todoList)) 
        .catch((err) => res.json(err)) 
}); 
  
// Add new task to the database 
app.post("/addTodoList", (req, res) => { 
    TodoModel.create({ 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
// Update task fields (including deadline) 
app.post("/updateTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    const updateData = { 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }; 
    TodoModel.findByIdAndUpdate(id, updateData) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
// Delete task from the database 
app.delete("/deleteTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    TodoModel.findByIdAndDelete({ _id: id }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})