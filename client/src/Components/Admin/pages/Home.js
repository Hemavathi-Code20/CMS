import React from "react";
import Navbar from "../components/Navbar";
import homebg from "../assets/home-bg.jpg";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <img src={homebg} alt="" />
    </div>
  );
};

export default Home;
