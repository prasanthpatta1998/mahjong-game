import React, { useState } from "react";
import "./mahjongGame.css";
import { useNavigate } from "react-router-dom";

const EntryComponent = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    navigate("/user/bordgame");
  };
  return (
    <>
      <h1>React Tiles</h1>
      <form className="display-score" onSubmit={handleSubmit}>
        <h1 style={{marginTop:'0rem'}}>Enter Your Name</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button className="play-button" type="submit">
          Play
        </button>
      </form>
    </>
  );
};

export default EntryComponent;
