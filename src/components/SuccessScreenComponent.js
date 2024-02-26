import React from "react";
import './mahjongGame.css'

const SuccessScreenComponent = () => {
    const userName = localStorage.getItem('name')
    const score = localStorage.getItem('score')
    const timer = localStorage.getItem('timer')
  return (
    <>
      <h1>React Tiles</h1>
      <div className="score-time">
        <h3>Score:{score}</h3>
        <h3>Time:{timer}</h3>
      </div>
      <div className="display-score" style={{marginTop:'0px', justifyContent: 'normal'}}>
        <div style={{width: '100%'}}><h2>Welcome {userName ? userName : null} 👋👋</h2></div>
        <h1 style={{marginTop: '8.5rem'}}>Game Finished!</h1>
        <h1 style={{marginBottom: '0px', color:'#f9bf69'}}>Score:{score}</h1>
        <h1 style={{marginTop: '0px', color:'#f9bf69'}}>Time Taken:{timer}</h1>
      </div>
    </>
  );
};

export default SuccessScreenComponent;
