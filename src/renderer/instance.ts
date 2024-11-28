import { Application, Assets, Container, Graphics, Sprite, Ticker, TickerCallback, TilingSprite } from "pixi.js";

class Instance {
    private _tileScaleDivisor: number = 20;
    private _app: Application = new Application();
    private _camera: Container = new Container();
    private _cameraPosition: Point = {x: 0, y: 0};
    private _cameraBinder: string = ''; // entity id
    private _cameraFriction: number = 5;
    private _debugger: Graphics = new Graphics();
    private _tileSize: number = 0;
    private _keymap: Set<string> = new Set();
    private _buttonmap: Set<number> = new Set();
    private _keydownFn: Map<string, (...args: any[]) => void> = new Map();
    private _keyupFn: Map<string, (...args: any[]) => void> = new Map();
    private _keypressedFn: Map<string, (...args: any[]) => void> = new Map();
    private _buttondownFn: Map<number, (...args: any[]) => void> = new Map();
    private _buttonupFn: Map<number, (...args: any[]) => void> = new Map();
    private _buttonpressedFn: Map<number, (...args: any[]) => void> = new Map();
    private _cursorPosition: Point = {x: 0, y: 0};
    loaded: boolean = false;
    constructor(){

    }
    get app():Application{return this._app}
    get tileSize():number{return this._tileSize}
    get camera():Container{return this._camera}
    get cameraPosition():Point{return this._cameraPosition}

    async init(window:Window){
        await this._app.init({
            backgroundColor: 0x000000,
            resizeTo: window,
        });
        this.addTicker(ticker => this.tick(ticker.deltaMS));
        this.resize();
        this.loaded = true;
    }

    applyTilemap(tilemap:number[][]){
        const background = new TilingSprite(Assets.get(""));
        background.label = "background";
        background.zIndex = -1000; 
        background.setSize(innerWidth, innerHeight);
        this._app.stage.addChild(background);
        // tile
        const worldContainer = new Container();
        worldContainer.label = "world";
        worldContainer.zIndex = -999;
        tilemap.forEach((row, i) => {
            row.forEach((num, j) => {
                const url = ""
                if(url){
                    const sprite = new TilingSprite(Assets.get(url));
                    sprite.setSize(this._tileSize, this._tileSize);
                    sprite.anchor.set(0.5, 0.5);
                    sprite.position.set(j * this._tileSize, i * this._tileSize);
                    sprite.label = `${i}-${j}`;
                    worldContainer.addChild(sprite);
                }
            })
        })
    }

    tick(delta:number){
        // sort children
        this._camera.children.forEach(sprite => {
            if(sprite.label === "world") return;
            sprite.zIndex = sprite.y;
        });
        this._camera.sortChildren();
        // camera
        this._camera.pivot.set(
            this._cameraPosition.x * this._tileSize,
            this._cameraPosition.y * this._tileSize
        );
        // keypressed
        this._keymap.forEach(key => {
            if(this._keypressedFn.has(key)) this._keypressedFn.get(key)?.call(this);
        });
        // buttonpressed
        this._buttonmap.forEach(button => {
            if(this._buttonpressedFn.has(button)) this._buttonpressedFn.get(button)?.call(this, this._cursorPosition);
        });
    }

    resize(){
        const screenWidth = innerWidth, screenHeight = innerHeight;
        this._camera.position.set(screenWidth / 2, screenHeight / 2);
        this._tileSize = Math.max(screenWidth * (9/16) / this._tileScaleDivisor, screenHeight / this._tileScaleDivisor);
        this.getBackground()?.setSize(screenWidth, screenHeight);
        this.getChild("world")?.children.forEach((sprite) => {
            sprite.setSize(this._tileSize, this._tileSize);
            const [x, y] = sprite.label.split("-").map(Number);
            sprite.position.set(x * this._tileSize, y * this._tileSize);
        });
    };
    isKeydown(key: string):boolean{return this._keymap.has(key)}
    isButtondown(button: number):boolean{return this._buttonmap.has(button)}
    addResizeEvent(element: Window){element.addEventListener("resize", this.resize.bind(this))}
    removeResizeEvent(element: Window){element.removeEventListener("resize", this.resize.bind(this))}
    keydown(e: KeyboardEvent){
        this._keymap.add(e.key);
        if(this._keydownFn.has(e.key)) this._keydownFn.get(e.key)?.call(this, e);
    }
    keyup(e: KeyboardEvent){
        this._keymap.delete(e.key);
        if(this._keyupFn.has(e.key)) this._keyupFn.get(e.key)?.call(this, e);
    }
    updateCursorPos(e: MouseEvent){
        this._cursorPosition.x = (e.offsetX - innerWidth / 2 + this._cameraPosition.x * this._tileSize) / this._tileSize;
        this._cursorPosition.y = (e.offsetY - innerHeight / 2 + this._cameraPosition.y * this._tileSize) / this._tileSize;
    }
    buttondown(e: MouseEvent){
        this._buttonmap.add(e.button);
        this.updateCursorPos(e);
        if(this._buttondownFn.has(e.button)) this._buttondownFn.get(e.button)?.call(this, {...this._cursorPosition});
    }
    buttonup(e: MouseEvent){
        this._buttonmap.delete(e.button);
        this.updateCursorPos(e);
        if(this._buttonupFn.has(e.button)) this._buttonupFn.get(e.button)?.call(this, {...this._cursorPosition});
    }
    mousemove(e: MouseEvent){
        this.updateCursorPos(e);
    }
    addKeydownEvent(element: Document){element.addEventListener("keydown", this.keydown.bind(this))}
    removeKeydownEvent(element: Document){element.removeEventListener("keydown", this.keydown.bind(this))}
    addKeyupEvent(element: Document){element.addEventListener("keyup", this.keyup.bind(this))}
    removeKeyupEvent(element: Document){element.removeEventListener("keyup", this.keyup.bind(this))}
    addButtondownEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.addEventListener("mousedown", this.buttondown.bind(this))}
    removeButtondownEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.removeEventListener("mousedown", this.buttondown.bind(this))}
    addButtonupEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.addEventListener("mouseup", this.buttonup.bind(this))}
    removeButtonupEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.removeEventListener("mouseup", this.buttonup.bind(this))}
    addMousemoveEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.addEventListener("mousemove", this.mousemove.bind(this))}
    removeMousemoveEvent(canvas: HTMLCanvasElement = this._app.canvas){canvas.removeEventListener("mousemove", this.mousemove.bind(this))}
    addTicker(fn: TickerCallback<any>, context?: any, priority?: number):Ticker{return this._app.ticker.add(fn, context, priority)}
    spawn(entityId: string, opt:any, _category:string = 'entities', _extender: string = 'svg'){
        const _sprite = new Sprite(Assets.get(`/assets/${_category}/${opt.tag}.${_extender}`));
        _sprite.anchor.set(opt.dAnchor.x, opt.dAnchor.y);
        _sprite.position.set(opt.position.x, opt.position.y);
        _sprite.rotation = opt.rotation;
        _sprite.setSize(
            this._tileSize * opt.dScale.x * opt.scale.x,
            this._tileSize * opt.dScale.y * opt.scale.y
        );
        _sprite.label = entityId;
        this._camera.addChild(_sprite);
    }
    despawn(entityId: string){
        const sprite = this.getChild(entityId);
        if(sprite){
            this._camera.removeChild(sprite);
            sprite.destroy();
        }
    }

    getBackground():TilingSprite|null{return this._app.stage.getChildByLabel("background") as TilingSprite}
    getChild(label: string):Container|Sprite|null{return this._camera.getChildByLabel(label);}

    bindToCameraById(entityId: string){this._cameraBinder = entityId;}
}

export default Instance;