// app/components/pixijs/Scene.tsx

import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { ParentProvider } from "../../contexts/ParentContext";

interface SceneProps {
    children?: React.ReactNode;
    width: number;
    height: number;
    background: number;
    pixelSize?: number;
    using?: string[];
}

const PixelContext = createContext<number|null>(null);

export const usePixel = () => {
    const context = useContext(PixelContext);
    if (!context) {
        throw new Error('usePixel must be used within a PixelProvider');
    }
    return context;
};

const Scene = ({ children, width, height, background, pixelSize, using = [] }:SceneProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        PIXI.Assets.load(using).then(() => {
            const app = new PIXI.Application();
            app.init({
                width, height,
                backgroundColor: background
            })
            .then(value => {
                setInitialized(true);
                if (divRef.current) {
                    divRef.current.appendChild(app.canvas);
                    appRef.current = app;
                    console.log(appRef.current);
                    return () => {
                        divRef.current?.removeChild(app.canvas)
                        app.destroy();
                        app.canvas.remove();
                    }
                }
                return () => {
                    app.destroy();
                }
            })
        })
    }, []);

    useEffect(() => {
        if (appRef.current) {
            appRef.current.renderer.background.color = background;
        }
    }, [background]);

    useEffect(() => {
        if (appRef.current) {
            appRef.current.renderer.resize(width, height);
        }
    }, [width, height, initialized]);

    return (<PixelContext.Provider value={pixelSize || 64} >
        <ParentProvider container={appRef.current?.stage || new PIXI.Container()}>
            <div ref={divRef} style={{overflow: "hidden", position: "relative"}} />
            {initialized && children}
        </ParentProvider>
    </PixelContext.Provider>);
};

export default Scene;