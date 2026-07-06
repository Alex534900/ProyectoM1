import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Login from "./components/Login";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 🔹 Función de logout
  const logout = () => {
    localStorage.removeItem("token"); // borrar el token
    setIsLoggedIn(false);             // volver al login
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchTasks(token);
    }
  }, []);

  const fetchTasks = async (token: string) => {
    const response = await fetch("http://localhost:3000/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (text: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar la tarea");
    }

    // Actualizar la lista de tareas
    setTasks(tasks.filter((task) => task.id !== id));

  } catch (error) {

  
    console.error(error);

  }
};

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  // 🔹 Si no está logueado, mostrar Login
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // 🔹 Si está logueado, mostrar el centro de trabajo
  return (
    <div className="app-container">
      <Header  /> {/* Pasamos la función logout */}
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
      />
      <Footer
        total={tasks.length}
        completed={completedTasks}
        pending={pendingTasks}
        onLogout={logout} 
      />
    </div>
  );
}

export default App;
