enum EnemyTag { inmate, guard }
enum ItemTag { stat, companion }

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
    hp: number;
    critical: number; 
    speed: number;
}
