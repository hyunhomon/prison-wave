import Ally from "./Ally"
import Enemy from "./Enemy"
import Floor from "./Floor"
import Item from "./Item"

class Game {
    difficulty: number;
    floor: Floor;
    currentFloor: number = 1;
    givenCost: number = 0;
    allies: Ally[] = [];
    enemies: Enemy[] = [];
    playerCost: number = 0;
    playerInventory: Item[] = [];

    turn: string = '' // 턴을 소유한 엔티티의 id

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