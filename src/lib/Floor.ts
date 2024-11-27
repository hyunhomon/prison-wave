class Floor {
    level: number
    map: boolean[][] = [[]]

    constructor(
        level: number
    ) {
        this.level = level
    }

    generateMap() {}
    spawnEnemies() {}
    spawnItems() {}
}

export default Floor