class Ally {
    id: string
    stat: Stat
    pos: Position
    isEscaped: boolean = false

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

export default Ally