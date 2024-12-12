import Ally from "./entity/Ally";
import Guard from "./entity/Guard";
import Prisoner from "./entity/Prisoner";
import Placement from "./Placement";

class Floor {
    map: number[][] = [[]];
    rooms: Room[] = [];
    startPoint: Position = { x: 0, y: 0 };
    endPoint: Position = { x: 0, y: 0 };
    dist: number = 0;

    generateMap(
        width: number,
        height: number,
        minRoomSize: number,
        maxRoomSize: number,
        density: number
    ) {
        this.map = Array.from({ length: height }, () => Array(width).fill(1));
        this.generateRooms(width, height, minRoomSize, maxRoomSize, density);
        this.connectRooms();
    }
    placeItems(
        placements: Placement[],
        itemCount: number
    ) {
        for (let i=0;i<itemCount;i++) {}
    }
    spawnEntities(
        prisoners: Prisoner[],
        entityCount: number
    ) {
        for (let i=0;i<entityCount;i++) {}
    }

    private generateRooms(
        width: number,
        height: number,
        minRoomSize: number,
        maxRoomSize: number,
        density: number
    ) {
        let current = 0;
        while (current / (width*height) < density) {
            const size = Math.floor(Math.random() * (maxRoomSize-minRoomSize+1)) + minRoomSize;
            const x = Math.floor(Math.random() * (width - size));
            const y = Math.floor(Math.random() * (height - size));
            const newRoom: Room = {
                x: x,
                y: y,
                centerX: x + Math.floor(size / 2),
                centerY: y + Math.floor(size / 2),
                size: size
            };

            let cnt = 0;

            for (let i=y;i<Math.min(y+size, height);i++) {
                for (let j=x;j<Math.min(x+size, width);j++) {
                    if (this.map[i][j] === 1) {
                        this.map[i][j] = 0;
                        cnt += 1;
                    }
                }
            }

            if (cnt > 0) {
                this.rooms.push(newRoom);
                current += cnt;
            }
        }
    }
    private connectRooms() {
        let connected = [this.rooms[0]];
        let unconnected = this.rooms.slice(1);

        while (connected.length > 0) {
            const current = connected.pop();

            if (!current) break;

            let minRoom = undefined;
            let minDist = Infinity;

            for (const room of unconnected) {
                const dist = Math.abs(current.centerX - room.centerX) +
                    Math.abs(current.centerY - room.centerY);
                
                if (dist < minDist) {
                    minRoom = room;
                    minDist = dist;
                }
                
                if (dist > this.dist) {
                    this.dist = dist;
                    this.startPoint = { x: current.centerX, y: current.centerY };
                    this.endPoint = { x: room.centerX, y: room.centerY };
                }
            }

            if (minRoom) {
                const startX = Math.min(current.centerX, minRoom.centerX);
                const endX = Math.max(current.centerX, minRoom.centerX);
                const startY = Math.min(current.centerY, minRoom.centerY);
                const endY = Math.max(current.centerY, minRoom.centerY);

                for (let x=startX;x<=endX;x++) this.map[current.centerY][x] = 0;
                for (let y=startY;y<=endY;y++) this.map[y][minRoom.centerX] = 0;

                connected.push(minRoom);
                unconnected.splice(unconnected.indexOf(minRoom), 1);
            }
        }
    }
}

export default Floor;