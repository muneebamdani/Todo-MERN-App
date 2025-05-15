import React, { useState, useEffect } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_BASE;

const TodoList = ({ refreshFlag }) => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    getAllTodos();
  }, [refreshFlag]);

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${api}/GetAllTodo`);
      setTodos(res.data.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${api}/DeleteTodo/${id}`);
    if (response.status === 200) {
      getAllTodos(); // refresh the list after deletion
      alert("Todo Deleted Successfully");
    } else {
      alert("Failed to delete todo. Server responded with status: " + response.status);
    }
  } catch (err) {
    console.log("Todo is not deleted", err);
    alert("There was an error deleting the todo.");
  }
};


  const updateTodo = async (id) => {
    if (newTitle.trim() === "") {
      return alert("Please Enter a Task");
    }

    try {
      const response = await axios.put(`${api}/UpdateTodo/${id}`, { title: newTitle });
      if (response.status === 200) {
        setEditingId(null);
        setNewTitle("");
        getAllTodos();
        alert("Todo Updated Successfully");
      }
    } catch (err) {
      console.log("Error Updating Task", err);
      alert("Error Updating Task");
    }
  };

  const taskComplete = async (id, complete) => {
    try {
      await axios.patch(`${api}/UpdateTodo/${id}`, { completed: complete });
      getAllTodos();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => taskComplete(todo._id, !todo.completed)}
                className="w-5 h-5 accent-green-600"
              />

              {editingId === todo._id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 border border-gray-300 px-2 py-1 rounded-md"
                />
              ) : (
                <p
                  className={`text-lg break-all ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === todo._id ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  onClick={() => updateTodo(todo._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setEditingId(todo._id);
                    setNewTitle(todo.title);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">No todos found</p>
      )}
    </div>
  );
};

export default TodoList;
