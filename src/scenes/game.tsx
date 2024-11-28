import { useEffect, useRef, useState } from "react";
import Instance from "../renderer/instance";
import { Screen } from "../components/styled";
import Loading from "../components/loading";
import { useOnce } from "../utils/hooks";
import { Interface, Inventory } from "../components/ui";
import Game from "../lib/Game";
import Item from "../lib/Item";

const GameComponent = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const instance = useRef<Instance>(new Instance());
    const game = useRef<Game>(new Game(0));
    const screenRef = useRef<HTMLDivElement>(null);
    const [inventory, setInventory] = useState<Item[]>([]);
    const [inventoryOpen, setInventoryOpen] = useState<boolean>(false);

    useOnce(async () => {
        await instance.current.init(window);
        setLoaded(true);

        setInventory([
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
        ])
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