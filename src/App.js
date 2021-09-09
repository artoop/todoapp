import React, { useEffect, useState } from "react";
import './App.css';

import Form from './components/Form';
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    if (loading) return;
    registerTasks();
  }, [todos]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }


  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8081/tarefas.json', {
        method: 'GET',
      });
      const tasks = await response.json();

      setTodos(tasks);
      setLoading(false);
    } catch (error) {
      console.log('Erro de conexão', error);
    }
  }

  const registerTasks = async () => {
    try {
      await fetch('http://localhost:8081/tarefas.json', {
        method: 'POST',
        body: JSON.stringify(todos),
      });
    } catch (error) {
      console.log('Erro de conexão', error);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Minhas Tarefas</h1>
      </header>

      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
