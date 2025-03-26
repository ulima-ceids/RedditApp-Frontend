import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const topics = ["Programación", "Juegos", "Noticias", "React", "Memes"];
  return (
    <aside className="sidebar">
      <h3>Comunidades</h3>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>#{topic}</li>
        ))}
      </ul>
    </aside>
  );
}
