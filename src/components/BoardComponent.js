import React, { useCallback, useEffect, useState } from "react";
import "./mahjongGame.css";
import TilesComponent from "./TilesComponent";
import { useNavigate } from "react-router-dom";

const BoardComponent = () => {
  const userName = localStorage.getItem("name");
  const [timer, setTimer] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const initialTiles = () => {
    const emojis = [
      "🎉",
      "🎆",
      "🔥",
      "⚡",
      "💥",
      "🐼",
      "🪆",
      "🪅",
      "🎊",
      "🗯️",
      "★",
      "🃏",
      "🪄",
      "🔦",
      "💫",
    ];
    const totalEmojis = emojis.concat(emojis);
    const shuffledEmojis = totalEmojis.sort(() => Math.random() - 0.5);
    setTiles(
      shuffledEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        display: false,
      }))
    );
    setFlippedTiles([]);
    setScore(0);
    setTimer(0);
  };

  const handleDisplay = (singleTile) => {
    if (flippedTiles.length < 2) {
      const updatedTiles = tiles.map((tile) =>
        tile.id === singleTile.id ? { ...tile, display: true } : tile
      );
      setFlippedTiles([
        ...flippedTiles,
        updatedTiles.find((tile) => tile.id === singleTile.id),
      ]);
      setTiles(updatedTiles);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    initialTiles();
  }, []);

  const formattedTimer = useCallback(
    () => {
      const minutes = Math.floor(timer / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(timer % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    },
    [timer] 
  );

  useEffect(() => {
    const displayInterval = setTimeout(() => {
      if (flippedTiles.length === 2) {
        const navigateSuccesspage = () => {
          const boolValue = tiles.every((tile) => tile.display === true);

          if (boolValue) {
            localStorage.setItem("score", score);
            localStorage.setItem("timer", formattedTimer());
            navigate("/user/success");
          }
        };
        const matching = flippedTiles[0].emoji === flippedTiles[1].emoji;
        if (!matching) {
          setTiles((prevTiles) =>
            prevTiles.map((tile) =>
              tile.id === flippedTiles[0].id || tile.id === flippedTiles[1].id
                ? { ...tile, display: false }
                : tile
            )
          );
          setScore((prevScore) => prevScore - 1);
        } else {
          setScore((prevScore) => prevScore + 1);
        }
        setFlippedTiles([]);
        navigateSuccesspage();
      }
    }, 500);

    return () => clearTimeout(displayInterval);
  }, [flippedTiles, score, tiles, navigate, formattedTimer]);

  return (
    <>
      <h1>Mahajong Game</h1>
      <div className="score-time">
        <h3>Score:{score}</h3>
        <h3>Time:{formattedTimer()}</h3>
      </div>
      <div
        className="display-score"
        style={{ marginTop: "0px", justifyContent: "normal" }}
      >
        <div style={{ width: "100%" }}>
          <h2>Welcome {userName ? userName : null} 👋👋</h2>
        </div>
        <div className="tiles-container">
          <TilesComponent tiles={tiles} handleDisplay={handleDisplay} />
        </div>
      </div>
    </>
  );
};

export default BoardComponent;
