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