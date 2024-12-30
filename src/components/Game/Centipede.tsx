import React, { useState, useEffect, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

const canvasWidth = 400;
const canvasHeight = 400;

const CentipedeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [centipede, setCentipede] = useState<Position[]>([{ x: 50, y: 50 }]);
    const [direction, setDirection] = useState<Position>({ x: 10, y: 0 });
    const [food, setFood] = useState<Position>(getNewFoodPosition());

    function getNewFoodPosition(): Position {
        const x = Math.floor(Math.random() * canvasWidth / 10) * 10;
        const y = Math.floor(Math.random() * canvasHeight / 10) * 10;
        return { x, y };
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    if (direction.y === 0) setDirection({ x: 0, y: -10 });
                    break;
                case "ArrowDown":
                    if (direction.y === 0) setDirection({ x: 0, y: 10 });
                    break;
                case "ArrowLeft":
                    if (direction.x === 0) setDirection({ x: -10, y: 0 });
                    break;
                case "ArrowRight":
                    if (direction.x === 0) setDirection({ x: 10, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        const interval = setInterval(() => {
            updateGame();
        }, 100);

        return () => {
            clearInterval(interval);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [centipede, direction]);

    const updateGame = () => {
        const head = { x: centipede[0].x + direction.x, y: centipede[0].y + direction.y };
        const newCentipede = [head, ...centipede];

        if (head.x === food.x && head.y === food.y) {
            setFood(getNewFoodPosition());
        } else {
            newCentipede.pop();
        }

        if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
            alert("Game Over");
            setCentipede([{ x: 50, y: 50 }]);
            setDirection({ x: 10, y: 0 });
        } else {
            setCentipede(newCentipede);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.fillStyle = "green";
                centipede.forEach((segment) => {
                    context.fillRect(segment.x, segment.y, 10, 10);
                });
                context.fillStyle = "red";
                context.fillRect(food.x, food.y, 10, 10);
            }
        }
    }, [centipede, food]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: "1px solid black" }}
        />
    );
};

export default CentipedeGame;
