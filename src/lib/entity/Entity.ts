class Entity {
    stat: Stat;
    position: Position;

    constructor(
        stat: Stat,
        position: Position,
    ) {
        this.stat = stat;
        this.position = position;
    }

    move() {}
    attack() {}
    useItem() {}
    die() {}
}

export default Entity;