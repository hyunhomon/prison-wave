class Enemy {
    id: string
    stat: Stat
    pos: Position
    cost: number = 0

    constructor(
        id: string,
        stat: Stat,
        pos: Position
    ) {
        this.id = id
        this.stat = stat
        this.pos = pos
    }

    takeMove() {}
    takeAction() {}
}

export default Enemy