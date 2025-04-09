import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch todos", err);
        setLoading(false);
      });
  }, [apiUrl]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title: newTodo, Completed: false }),
      });

      const created = await res.json();
      setTodos([...todos, created]);
      setNewTodo("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const markAsCompleted = async (todo) => {
    if (todo.completed) return;

    try {
      const updated = { ...todo, completed: true };

      const res = await fetch(`${apiUrl}/api/todos/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const result = await res.json();

      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? result : t))
      );
    } catch (err) {
      console.error("Failed to mark as completed", err);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
  
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete TODO");
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 TODO</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            style={styles.input}
          />
          <button onClick={handleAddTodo} style={styles.addButton}>
            ➕ Add
          </button>
        </div>

        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : todos.length === 0 ? (
          <p style={styles.empty}>No TODOs found.</p>
        ) : (
          <ul>
  {todos.map((todo) => (
    <li key={todo._id} style={styles.todoItem}>
      <span
        style={{
          ...styles.todoTitle,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#333",
        }}
      >
        {todo.completed ? "✅" : "⬜"} {todo.Title}
      </span>

      <div style={styles.todoButtons}>
        {!todo.completed && (
          <button style={styles.button} onClick={() => markAsCompleted(todo)}>
            ✅ Complete
          </button>
        )}
        <button
          style={{ ...styles.button, backgroundColor: "#e74c3c" }}
          onClick={() => deleteTodo(todo._id)}
        >
          🗑 Delete
        </button>
      </div>
    </li>
  ))}
</ul>

        )}
      </div>
    </div>
  );
};

// 🎨 Inline styles for simple aesthetics
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f2f4f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "1.5rem",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  addButton: {
    padding: "0.75rem 1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    color: "#888",
  },
  empty: {
    textAlign: "center",
    color: "#999",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "0.5rem",
    marginBottom: "0.75rem",
  },
  todoTitle: {
    fontSize: "1rem",
    fontWeight: "500",
  },
  completeButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};

export default App;
