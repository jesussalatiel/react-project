"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import styles from "./App.module.css"; // Usar CSS Modules
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Configura Amplify con las salidas generadas
Amplify.configure({
  Auth: {
      Cognito: {
        userPoolClientId: '5b44j7avt50stl2vial798u1p8',
        userPoolId: 'us-east-2_sBRRxLHX6',
      }
  },
});

// Genera el cliente de Amplify con tipos fuertes
const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // Función para listar los todos
  function listTodos() {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
      error: (error) => console.error("Error fetching todos:", error),
    });

    // Retorna la función de limpieza
    return () => subscription.unsubscribe();
  }

  // Efecto para suscribirse a los cambios de los todos
  useEffect(() => {
    // const cleanup = listTodos();
    // return cleanup; // Limpia la suscripción al desmontar el componente
  }, []);

  // Función para crear un nuevo todo
  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      // client.models.Todo.create({ content })
        // .then(() => console.log("Todo created successfully"))
        // .catch((error) => console.error("Error creating todo:", error));
    }
  }

  return (
    <main className={styles.container}>
      <h1>My Todos</h1>
      <button onClick={createTodo} className={styles.button}>
        + New Todo
      </button>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a
          href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}