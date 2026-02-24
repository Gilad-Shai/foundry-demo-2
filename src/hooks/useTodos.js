import { useState, useCallback } from 'react';
import { loadTodos, saveTodos } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const initialTodos = loadTodos();

export function useTodos() {
  const [todos, setTodos] = useState(initialTodos);

  const persistAndSet = useCallback((updatedTodos) => {
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  }, []);

  const addTodo = useCallback((todoData) => {
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || '',
      client: todoData.client || '',
      project: todoData.project || '',
      priority: todoData.priority || 'medium',
      dueDate: todoData.dueDate || '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    persistAndSet([newTodo, ...todos]);
  }, [todos, persistAndSet]);

  const updateTodo = useCallback((id, updates) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo
    );
    persistAndSet(updatedTodos);
  }, [todos, persistAndSet]);

  const deleteTodo = useCallback((id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    persistAndSet(updatedTodos);
  }, [todos, persistAndSet]);

  const toggleComplete = useCallback((id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
        : todo
    );
    persistAndSet(updatedTodos);
  }, [todos, persistAndSet]);

  const getClients = useCallback(() => {
    const clients = todos
      .map((todo) => todo.client)
      .filter((client) => client && client.trim() !== '');
    return [...new Set(clients)].sort();
  }, [todos]);

  const getProjects = useCallback((client) => {
    const filteredTodos = client
      ? todos.filter((todo) => todo.client === client)
      : todos;
    const projects = filteredTodos
      .map((todo) => todo.project)
      .filter((project) => project && project.trim() !== '');
    return [...new Set(projects)].sort();
  }, [todos]);

  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = todos.filter((t) => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    const byClient = todos.reduce((acc, todo) => {
      const client = todo.client || 'Unassigned';
      if (!acc[client]) {
        acc[client] = { total: 0, completed: 0 };
      }
      acc[client].total += 1;
      if (todo.completed) acc[client].completed += 1;
      return acc;
    }, {});

    return { total, completed, pending, overdue, byClient };
  }, [todos]);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getClients,
    getProjects,
    getStats,
  };
}