interface Position {
    x: number;
    y: number;
}
interface Room {
    x: number;
    y: number;
    centerX: number;
    centerY: number;
    size: number;
}
interface Stat {
    atk: number;
    def: number;
    health: number;
    critical: number; 
    speed: number;
}
interface Item {
    name: string;
    description: string;
    stat: Stat;
}
