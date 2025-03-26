import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Ulima SocialNetwork</h2>
      <input type="text" placeholder="Buscar..." className="search-input" />
      <button className="profile-btn">Mi perfil</button>
    </nav>
  );
}
