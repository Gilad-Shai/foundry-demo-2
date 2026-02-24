const STORAGE_KEY = 'freelancer_todos';
const CLIENTS_KEY = 'freelancer_clients';
const PROJECTS_KEY = 'freelancer_projects';

export const loadTodos = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load todos from storage:', err);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    const serialized = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Failed to save todos to storage:', err);
  }
};

export const loadClients = () => {
  try {
    const serialized = localStorage.getItem(CLIENTS_KEY);
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load clients from storage:', err);
    return [];
  }
};

export const saveClients = (clients) => {
  try {
    const serialized = JSON.stringify(clients);
    localStorage.setItem(CLIENTS_KEY, serialized);
  } catch (err) {
    console.error('Failed to save clients to storage:', err);
  }
};

export const loadProjects = () => {
  try {
    const serialized = localStorage.getItem(PROJECTS_KEY);
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load projects from storage:', err);
    return [];
  }
};

export const saveProjects = (projects) => {
  try {
    const serialized = JSON.stringify(projects);
    localStorage.setItem(PROJECTS_KEY, serialized);
  } catch (err) {
    console.error('Failed to save projects to storage:', err);
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CLIENTS_KEY);
    localStorage.removeItem(PROJECTS_KEY);
  } catch (err) {
    console.error('Failed to clear data from storage:', err);
  }
};

export const exportData = () => {
  try {
    const data = {
      todos: loadTodos(),
      clients: loadClients(),
      projects: loadProjects(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  } catch (err) {
    console.error('Failed to export data:', err);
    return null;
  }
};

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.todos) saveTodos(data.todos);
    if (data.clients) saveClients(data.clients);
    if (data.projects) saveProjects(data.projects);
    return true;
  } catch (err) {
    console.error('Failed to import data:', err);
    return false;
  }
};