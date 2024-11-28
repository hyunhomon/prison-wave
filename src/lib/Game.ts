import Ally from "./Ally"
import Enemy from "./Enemy"
import Floor from "./Floor"
import Item from "./Item"

class Game {
    difficulty: number
    currentFloor: number = 1
    givenCost: number = 0
    allies: Ally[] = []
    enemies: Enemy[] = []

    floor: Floor = new Floor(this.currentFloor)

    playerCost: number = 0
    playerInventory: Item[] = []

    turn: string = '' // 턴을 소유한 엔티티의 id

    constructor(
        difficulty: number
    ) {
        this.difficulty = difficulty
    }
}

export default Game;