import React, { useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
const api = import.meta.env.VITE_API_BASE;

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (title.trim() === "") {
      return alert("Please Enter A Task");
    }

    try {
      // Post the new todo
      await axios.post(`${api}/Create-Todo`, {
        title,
        completed: false,
      });
      setTitle(""); // Reset input field
      // Trigger the update of the TodoList
      window.location.reload(); // This forces the page to reload and fetch the updated list from the backend
    } catch (err) {
      console.log("Error adding todo", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📝 Todo App</h1>

        {/* Form */}
        <form
          className="flex flex-col sm:flex-row gap-3 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new todo"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-700 text-white px-5 py-2 rounded-md"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        <TodoList />
      </div>
    </div>
  );
};

export default TodoForm; // Ensure default export
