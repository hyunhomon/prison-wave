import Ally from "./entity/Ally"
import Floor from "./Floor"
import Guard from "./entity/Guard";
import Prisoner from "./entity/Prisoner";
import Player from "./controller/Player";
import Enemy from "./controller/Enemy";

class Game {
    difficulty: number;
    floor: Floor;
    currentFloor: number = 1;

    player: Player = new Player();
    enemy: Enemy = new Enemy();

    allies: Ally[] = [];
    guards: Guard[] = [];
    prisoners: Prisoner[] = [];
    items: Item[] = [];

    cost: number = 0;
    turn: string = '';

    constructor(
        difficulty: number
    ) {
        const MIN_MAP_SIZE = 100;
        const MAX_MAP_SIZE = 80;
        const MIN_ROOM_SIZE = 10;
        const MAX_ROOM_SIZE = 20;
        const MAP_SCALE_INCREMENT = 20;

        this.difficulty = difficulty;
        this.floor = new Floor(
            Math.floor(Math.random() * (MAX_MAP_SIZE - MIN_MAP_SIZE + 1)) + MIN_MAP_SIZE + difficulty * MAP_SCALE_INCREMENT,
            Math.floor(Math.random() * (MAX_MAP_SIZE - MIN_MAP_SIZE + 1)) + MIN_MAP_SIZE + difficulty * MAP_SCALE_INCREMENT,
            Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE + 1)) + MIN_ROOM_SIZE,
            Math.floor(Math.random() * (MAX_ROOM_SIZE - MIN_ROOM_SIZE + 1)) + MIN_ROOM_SIZE
        );
    }
}

export default Game;