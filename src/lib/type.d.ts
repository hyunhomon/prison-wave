enum EnemyTag { inmate, guard }
enum ItemTag { stat, companion, problem }

interface Position {
    x: number,
    y: number
}
interface Stat {
    atk: number;
    def: number;
    hp: number;
    critical: number; 
    speed: number;
}