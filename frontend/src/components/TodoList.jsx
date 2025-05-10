import React, { useState, useEffect } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_API_BASE;

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${api}/GetAllTodo`);
      setTodos(res.data.data); // Assuming response is structured as { data: [...] }
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${api}/DeleteTodo/${id}`);
      alert("Todo Deleted Successfully");
      getAllTodos(); // Refresh list after delete
    } catch (err) {
      console.log("Todo is not deleted", err);
    }
  };

  const updateTodo = async (id, title) => {
    if (title.trim() === "") {
      return alert("Please Enter a Task");
    }

    try {
      await axios.put(`${api}/UpdateTodo/${id}`, { title });
      getAllTodos(); // Refresh list after update
    } catch (err) {
      console.log("Error Updating Task", err);
    }
  };

  const taskComplete = async (id, complete) => {
    try {
      await axios.patch(`${api}/UpdateTodo/${id}`, { completed: complete });
      getAllTodos(); // Refresh list after completion update
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📋 My Todo List</h1>

        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => { taskComplete(todo._id, !todo.completed); }}
                  className="w-5 h-5 accent-green-600"
                />
                <p className={`text-lg break-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.title}
                </p>
              </div>

              {/* Edit Input */}
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  onClick={() => updateTodo(todo._id, todo.title)}
                >
                  Update
                </button>

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
    </div>
  );
};

export default TodoList;
