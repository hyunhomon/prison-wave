import { useEffect, useRef, useState } from "react";
import Instance from "../renderer/instance";
import { Screen } from "../components/styled";
import Loading from "../components/loading";
import { useOnce } from "../utils/hooks";
import { Interface, Inventory } from "../components/ui";
import Game from "../lib/Game";
import Item from "../lib/Item";

const GameComponent = (props:{
    difficulty:number;
}) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const instance = useRef<Instance>(new Instance());
    const game = useRef<Game>(new Game(props.difficulty));
    const screenRef = useRef<HTMLDivElement>(null);
    const [inventory, setInventory] = useState<Item[]>([]);
    const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);
    const [tilemap, setTilemap] = useState<number[][]>([]);

    useOnce(async () => {
        await instance.current.init(window);
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

        instance.current.applyTilemap(_tilemap);

        console.log(game.current, instance.current);

        instance.current.addMousemoveEvent();
        instance.current.addButtondownEvent();
        instance.current.addButtonupEvent();
        instance.current.addKeydownEvent(document);
        instance.current.addKeyupEvent(document);
        instance.current.addResizeEvent(window);
        return () => {
            instance.current.removeMousemoveEvent();
            instance.current.removeButtondownEvent();
            instance.current.removeButtonupEvent();
            instance.current.removeKeydownEvent(document);
            instance.current.removeKeyupEvent(document);
            instance.current.removeResizeEvent(window);
        }
    });

    useEffect(() => {
        if(!instance.current.loaded) return;
        screenRef.current?.appendChild(instance.current.app.canvas);
    }, [loaded]);

    return loaded ? <Screen ref={screenRef}>
        <Interface invOpen={inventoryOpen} setInvOpen={setInventoryOpen}></Interface>
        {inventoryOpen && <Inventory inventory={inventory}></Inventory>}
    </Screen> : <Loading />;
}

export default GameComponent;