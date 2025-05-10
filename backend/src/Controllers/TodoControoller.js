const Todo = require('../models/Todo.Schema');


const CreateTodo = async (req,res) => {
    let {title,completed} = req.body;
    if(!title && !completed) {
        res.status(400).json({ message: "Title and Completes is required" })

    }
    console.log(title,completed);
    const newTodo = await Todo.create({  title, completed })

    res.status(200).json({
        message: "Todo added Successfully",
        data: newTodo
    })
    
}

const getAlltodo = async (req,res) => {
   let todos = await Todo.find();
   res.status(200).json({
    message: "data Get Successfully",
      data: todos
   })
}

const deleteTodo = async (req,res) => {
  let deleteTodos = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message:"Todo Deleted Successfully"
  })
}

const updateTodo = async (req,res) => {
   let {title,completed} = req.body;
   let updatTodos = await Todo.findByIdAndUpdate(req.params.id, {title,completed});
   res.status(200).json({
    message: "Todo Updated Succussfully",
    data:updatTodos
   })
}

module.exports = {
    CreateTodo,
    getAlltodo,
    deleteTodo,
    updateTodo
}