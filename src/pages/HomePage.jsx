import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}

export default HomePage;
