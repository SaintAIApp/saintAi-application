import React from "react";
import Tetris from "react-tetris";
import "./TetrisGame.css";
const TetrisGame: React.FC = () => {
    return (
        <Tetris
            keyboardControls={{
                down: "MOVE_DOWN",
                left: "MOVE_LEFT",
                right: "MOVE_RIGHT",
                space: "HARD_DROP",
                z: "FLIP_COUNTERCLOCKWISE",
                x: "FLIP_CLOCKWISE",
                up: "FLIP_CLOCKWISE",
                p: "TOGGLE_PAUSE",
                c: "HOLD",
                shift: "HOLD"
            }}
        >
            {({
                Gameboard,
                PieceQueue,
                points,
                linesCleared,
                state,
                controller
            }) => (
                <div>
                    <div>
                        <p>Points: {points}</p>
                        <p>Lines Cleared: {linesCleared}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "start" }}>
                        <Gameboard />
                        <div className="ml-6">
                            <PieceQueue />
                        </div>
                    </div>

                    {state === "LOST" && (
                        <div>
                            <h2>Game Over</h2>
                            <button onClick={controller.restart}>New Game</button>
                        </div>
                    )}
                </div>
            )}
        </Tetris>
    );
};

export default TetrisGame;
