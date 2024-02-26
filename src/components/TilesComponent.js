import React, { memo } from "react";

const TilesComponent = (props) => {
  const { tiles, handleDisplay } = props;

  const handleTile = (tile) => {
    handleDisplay(tile);
  };

  return (
    <>
      {tiles.map((tile, index) => {
        return (
          <button
            key={index}
            className={`tile ${tile.display ? "rotate" : ""}`}
            onClick={() => handleTile(tile)}
            style={{ cursor: tile.display ? "none" : "pointer" }}
          >
            {tile.display ? tile.emoji : null}
          </button>
        );
      })}
    </>
  );
};

export default memo(TilesComponent);
