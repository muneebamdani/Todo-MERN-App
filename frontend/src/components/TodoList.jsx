import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState("");
  const [editid, setEditId] = useState(null);

  useEffect(() => {
    GEtAllTodo()
  }, []);

  const GEtAllTodo = async () => {
    await axios.get(`${API_BASE}/GetAllTodo`)
      .then(res => {
        setTodos(res.data.data)
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      })
  }

  const Deletetodo = async (id) => {
    await axios.delete(`${API_BASE}/DeleteTodo${id}`)
      .then(res => {
        alert("Todo Deleted Successfully")
        GEtAllTodo()
      })
      .catch((err) => { console.log("Todo is not deleted", err) })
  }

  const UpdateTodo = async (id) => {
   if (edit.trim() === "") {
      return alert("Please Enter a Task");
   }
    await axios.put(`${API_BASE}/UpdateTodo${id}`, {
      title: edit
    })
    setEdit("")
    setEditId(null)
    GEtAllTodo()
      .catch((err) => console.log("Error Updating Task",err))
  }

  const TaskComplete = async (id, complete) => {


    
    await axios.patch(`${API_BASE}/UpdateTodo${id}`, {
      completed: complete
    })
    GEtAllTodo()
      .catch((err) => console.log("Error", err))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">📋 My Todo List</h1>

        {todos && todos.length > 0 ? (
          todos.map(todo => (
            <div key={todo._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              
              {/* Checkbox & Task Title */}
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => { TaskComplete(todo._id, !todo.completed) }}
                  className="w-5 h-5 accent-green-600"
                />
                <p className={`text-lg break-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.title}
                </p>
              </div>

              {/* Edit Input */}
              {editid === todo._id && (
                <input
                  type="text"
                  placeholder="Update Task"
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2"
                />
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    if (editid === todo._id) {
                      UpdateTodo(todo._id)
                    } else {
                      setEditId(todo._id)
                      setEdit(todo.title)
                    }
                  }}
                >
                  {editid === todo._id ? "Save" : "Update"}
                </button>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => { Deletetodo(todo._id) }}
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

