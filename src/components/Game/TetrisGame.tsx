import React from "react";
import Tetris from "react-tetris";
import "./TetrisGame.css";
const TetrisGame: React.FC<{ onGameOver: () => void, startNewGame: () => void }> = ({ onGameOver, startNewGame }) => {
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
            }) => {
                if (state === "LOST") {
                    onGameOver();
                }

                return (
                    <div>
                        <div className="mb-6">
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
                            <div className="flex items-center justify-center w-full mt-4">
                                <button className="bg-primary text-white p-2 rounded-md hover:bg-secondary" onClick={() => { startNewGame(); controller.restart(); }}>Start New Game</button>
                            </div>
                        )}
                    </div>
                );
            }}
        </Tetris>
    );
};

export default TetrisGame;
