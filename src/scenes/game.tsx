import { useEffect, useRef, useState } from "react";
import { Screen } from "../components/styled";
import Loading from "../components/loading";
import { useOnce } from "../utils/hooks";
import { Interface, Inventory } from "../components/ui";
import Game from "../lib/Game";
import Item from "../lib/ItemTemplates";
import Scene from "../components/pixijs/Scene";
import { useWindowSize } from "usehooks-ts";
import Camera from "../components/pixijs/Camera";
import Sprite from "../components/pixijs/Sprite";
import { Transform } from "../utils/modules";

const GameComponent = (props:{
    difficulty:number;
}) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const game = useRef<Game>(new Game(props.difficulty));
    const screenRef = useRef<HTMLDivElement>(null);
    const [inventory, setInventory] = useState<Item[]>([]);
    const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);
    const [tilemap, setTilemap] = useState<number[][]>([]);
    const { width, height } = useWindowSize();

    useOnce(async () => {
        setLoaded(true);

        game.current.playerInventory = [
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
            new Item('assets/icons/users.svg', 'hyunho\'s ddong', 'jinseok will be like it. probably..'),
        ]
        setInventory(game.current.playerInventory);

        const _tilemap = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        setTilemap(_tilemap);
        return () => {
        }
    });

    useEffect(() => {
    }, [loaded]);

    return loaded ? <Screen ref={screenRef}>
        <Scene background={0x000000} width={width} height={height} pixelSize={64}>
            <Camera screenWidth={width} screenHeight={height}>
                {tilemap.map((row, y) => row.map((tile, x) => <Sprite key={`${x}-${y}`} texture="assets/tiles.png" transform={new Transform([x, y], 0, [1, 1], 0, [.5, .5])}></Sprite>))}
            </Camera>
        </Scene>
        <Interface invOpen={inventoryOpen} setInvOpen={setInventoryOpen}></Interface>
        {inventoryOpen && <Inventory inventory={inventory}></Inventory>}
    </Screen> : <Loading />;
}

export default GameComponent;