import Phaser from "phaser";
import { WebFontLoaderPlugin } from "phaser3-webfont-loader";
import GameScene from "./scenes/Game.js";
import PreloadScene from "./scenes/Preload.js";
import "./game.css";

const config = {
    type: Phaser.AUTO,
    width: 320,       // Set fixed width
    height: 600,      // Set fixed height
    backgroundColor: "#1e272e",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [PreloadScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,               // Adjusts the game to fit within the given dimensions
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the game both horizontally and vertically
    },
    plugins: {
        global: [{
            key: "WebFontLoader",
            plugin: WebFontLoaderPlugin,
            start: true,
        }],
    },
};

const startGame = () => new Phaser.Game(config);

window.addEventListener("load", startGame);