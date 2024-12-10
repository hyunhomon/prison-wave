
type FilterName =
    "AdjustmentFilter" |
    "AdvancedBloomFilter" |
    "AsciiFilter" |
    "BevelFilter" |
    "BloomFilter" |
    "BlurFilter" |
    "BulgePinchFilter" |
    "ColorMapFilter" |
    "ColorOverlayFilter" |
    "ColorReplaceFilter" |
    "ConvolutionFilter" |
    "CrossHatchFilter" |
    "CRTFilter" |
    "DisplacementFilter" |
    "DotFilter" |
    "DropShadowFilter" |
    "EmbossFilter" |
    "GlitchFilter" |
    "GlowFilter" |
    "GodrayFilter" |
    "GrayscaleFilter" |
    "HslAdjustmentFilter" |
    "KawaseBlurFilter" |
    "MotionBlurFilter" |
    "MultiColorReplaceFilter" |
    "NoiseFilter" |
    "OldFilmFilter" |
    "OutlineFilter" |
    "PixelateFilter" |
    "RadialBlurFilter" |
    "ReflectionFilter" |
    "RGBSplitFilter" |
    "ShockwaveFilter" |
    "SimpleLightmapFilter" |
    "TiltShiftFilter" |
    "TwistFilter" |
    "ZoomBlurFilter";

interface Filter{
    type: FilterName; // filter type
    data: any; // filter data
}

type Vector2 = [number, number];

interface Transform{
    position: Vector2; // position of the object
    rotation: number; // rotation of the object
    scale: Vector2; // scale of the object
    alpha: number; // alpha of the object 0 ~ 1
    pivot: Vector2; // pivot of the object
    tint: number; // tint of the object
}

interface ObjectState{
    id: string; // id of the object
    transform: Transform; // transform of the object
    filters: Filter[]; // filters of the object
}

interface Point{
    x: number;
    y: number;
}

interface Bound{
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Line{
    start: Point;
    end: Point;
}

interface Circle{
    x: number;
    y: number;
    radius: number;
}
