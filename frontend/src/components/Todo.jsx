import axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      if (text.trim() === "") return;

      await axios.post("http://localhost:3000/todo/add", {
        todo: text,
      });

      setText("");
      fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTodo = async () => {
    try {
      const res = await axios.get("http://localhost:3000/todo");
      setTodo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodo = async (id) => {
    try {
      await axios.put(`http://localhost:3000/todo/complete/${id}`);
      fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = async (id) => {
    try {
      const newText = prompt("Enter new todo");

      if (newText.trim() === "") return;

      await axios.put(`http://localhost:3000/todo/edit/${id}`, {
        todo: newText,
      });

      fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`);
      fetchTodo();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Todo App
        </h1>

        <form onSubmit={addTodo} className="flex gap-3 mb-6">
          <input
            type="text"
            value={text}
            placeholder="Enter your todo here..."
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {todo.length > 0 ? (
            todo.map((item) => (
              <div
                key={item._id}
                className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white flex justify-between items-center hover:bg-white/20 transition"
              >
                <span
                  className={`${
                    item.isCompleted
                      ? "line-through text-gray-400"
                      : "text-white"
                  }`}
                >
                  {item.content}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editTodo(item._id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => completeTodo(item._id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => removeTodo(item._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No todos yet...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
