import Ally from "./entity/Ally"
import Floor from "./Floor"
import Guard from "./entity/Guard";
import Prisoner from "./entity/Prisoner";
import Player from "./controller/Player";
import Enemy from "./controller/Enemy";
import Placement from "./Placement";
import GameConfig from "./GameConfig";

class Game {
    difficulty: number;
    floor: Floor = new Floor();
    currentFloor: number = 1;

    player: Player = new Player();
    enemy: Enemy = new Enemy();

    allies: Ally[] = [];
    guards: Guard[] = [];
    prisoners: Prisoner[] = [];
    placements: Placement[] = [];

    winner: number = -1;
    cost: number = 0;
    turn: boolean = true;

    constructor(difficulty: number) {
        this.difficulty = difficulty;
    }
    startup() {
        this.setFloor();
    }
    update() {
        this.checkAllies();
    }

    private setFloor() {
        this.floor.generateMap(
            Math.floor(Math.random() * (GameConfig.MAX_MAP_SIZE - GameConfig.MIN_MAP_SIZE + 1)) + GameConfig.MIN_MAP_SIZE + this.difficulty * this.currentFloor * GameConfig.MAP_SCALE_INCREMENT,
            Math.floor(Math.random() * (GameConfig.MAX_MAP_SIZE - GameConfig.MIN_MAP_SIZE + 1)) + GameConfig.MIN_MAP_SIZE + this.difficulty * this.currentFloor * GameConfig.MAP_SCALE_INCREMENT,
            Math.floor(Math.random() * (GameConfig.MAX_ROOM_SIZE - GameConfig.MIN_ROOM_SIZE + 1)) + GameConfig.MIN_ROOM_SIZE,
            Math.floor(Math.random() * (GameConfig.MAX_ROOM_SIZE - GameConfig.MIN_ROOM_SIZE + 1)) + GameConfig.MIN_ROOM_SIZE,
            GameConfig.MAP_INITIAL_DENSITY - this.currentFloor * 0.1
        );
        this.floor.placeItems(this.placements, GameConfig.ITEM_COUNT - this.currentFloor * GameConfig.ITEM_COUNT_DECREMENT);
        this.floor.spawnEntities(this.prisoners, GameConfig.ENTITY_COUNT);
        this.allies.push(new Ally(
            {
                atk: GameConfig.STAT_INITIAL_ATK,
                def: GameConfig.STAT_INITIAL_DEF,
                health: GameConfig.STAT_INITIAL_HEALTH,
                critical: GameConfig.STAT_INITIAL_CRITICAL,
                speed: GameConfig.STAT_INITIAL_SPEED
            },
            this.floor.startPoint
        ));
        this.guards.push(new Guard(
            {
                atk: GameConfig.STAT_INITIAL_ATK * (this.difficulty+1),
                def: GameConfig.STAT_INITIAL_DEF * (this.difficulty+1),
                health: GameConfig.STAT_INITIAL_HEALTH * (this.difficulty+1),
                critical: GameConfig.STAT_INITIAL_CRITICAL * (this.difficulty+1),
                speed: GameConfig.STAT_INITIAL_SPEED * (this.difficulty+1)
            },
            this.floor.endPoint
        ));
    }
    private checkAllies() {
        if (this.allies.length === 0) {
            if (this.currentFloor < GameConfig.CLEAR_FLOOR) {
                this.currentFloor += 1;
                this.setFloor();
            } else {
                if (this.player.score > this.enemy.score) {
                    this.winner = 0;
                    console.log("Player Win!");
                } else {
                    this.winner = 1;
                    console.log("Enemy Win!");
                }
            }
        }
    }
}

export default Game;