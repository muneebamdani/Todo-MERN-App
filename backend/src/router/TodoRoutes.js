const express = require("express");
const router = express.Router();
const { CreateTodo,getAlltodo,deleteTodo,updateTodo } = require("../Controllers/TodoControoller"); 


router.post("/Create-Todo", CreateTodo);
router.get("/GetAllTodo", getAlltodo);
router.delete("/DeleteTodo/:id", deleteTodo);
router.put("/UpdateTodo/:id", updateTodo);
router.patch("/UpdateTodo/:id", updateTodo);

module.exports = router;
