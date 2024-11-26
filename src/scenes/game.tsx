import { useEffect, useRef, useState } from "react";
import Instance from "../renderer/instance";
import { Screen } from "../components/styled";
import Loading from "../components/loading";
import { useOnce } from "../utils/hooks";

const Game = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const instance = useRef<Instance>(new Instance());
    const screenRef = useRef<HTMLDivElement>(null);

    useOnce(async () => {
        await instance.current.init(window);
        setLoaded(true);
    });
    
    useEffect(() => {
        if(!instance.current.loaded) return;
        screenRef.current?.appendChild(instance.current.app.canvas);
    }, [loaded]);

    return loaded ? <Screen ref={screenRef}>
    </Screen> : <Loading />;
}

export default Game;