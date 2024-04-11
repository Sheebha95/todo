import React, { useState, useEffect } from "react";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";
import { Button } from "@mui/material";
import axios from "axios";


const App = async () => {
  try{ 
  const response = await axios.post("https://localhost:5000/todo", todo);
  console.log("response", response.data);
  setTodos(response.data);
} catch (error){
      console.log(error);
}
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodo();
    // Fetch todos from API
    // setTodos([
    //   { id: 1, title: "Todo 1", description: "Description 1" },
    //   { id: 2, title: "Todo 2", description: "Description 2" },
    //   { id: 3, title: "Todo 3", description: "Description 3" },
    // ]);
  }, []);

  const fetchTodo = async () => {
    try {
    const response = await axios.get("http://localhost:5000/todos", todo);
    console.log("Response", response.data);
    setTodos(response.data);
  } catch (error){
    console.log(error);
  }
};

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleEditTodo = (todo) => {
    console.log(todo);
    setShowForm(true);
    setEditingTodo(todo);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleAdd = () => {
    setShowForm(true);
    setEditingTodo("");
  };
  return (
    <div>
      <h1>Todo App</h1>
      <Button onClick={handleAdd}>Add</Button>
      <TodoTable
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />
      {editingTodo && showForm && (
        <>
          <h2>Edit Todo</h2>
          <TodoForm todo={editingTodo} onSubmit={handleUpdateTodo} />
        </>
      )}
      {!editingTodo && showForm && (
        <>
          <h2>Add Todo</h2>
          <TodoForm onSubmit={handleAddTodo} />
        </>
      )}
    </div>
  );

};

export default App;