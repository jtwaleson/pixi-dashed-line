import { Graphics, Point, Texture, Matrix } from "pixi.js";
/** Define the dash: [dash length, gap size, dash size, gap size, ...] */
export type Dashes = number[];
export type DashLineOptions = {
    dash?: Dashes;
    width?: number;
    color?: number;
    alpha?: number;
    scale?: number;
    useTexture?: boolean;
    cap?: "butt" | "round" | "square";
    join?: "bevel" | "miter" | "round";
    alignment?: number;
    offset?: number;
};
export declare class DashLine {
    graphics: Graphics;
    /** current length of the line */
    lineLength: number;
    /** cursor location */
    cursor: Point;
    /** desired scale of line */
    scale: number;
    private activeTexture;
    private start;
    private dashSize;
    private dash;
    private useTexture;
    private options;
    static dashTextureCache: Record<string, Texture>;
    /**
     * Create a DashLine
     * @param graphics
     * @param [options]
     * @param [options.useTexture=false] - use the texture based render (useful for very large or very small dashed lines)
     * @param [options.dashes=[10,5] - an array holding the dash and gap (eg, [10, 5, 20, 5, ...])
     * @param [options.width=1] - width of the dashed line
     * @param [options.alpha=1] - alpha of the dashed line
     * @param [options.color=0xffffff] - color of the dashed line
     * @param [options.cap] - add a PIXI.LINE_CAP style to dashed lines (only works for useTexture: false)
     * @param [options.join] - add a PIXI.LINE_JOIN style to the dashed lines (only works for useTexture: false)
     * @param [options.alignment] - The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner)
     */
    constructor(graphics: Graphics, options?: DashLineOptions);
    /** resets line style to enable dashed line (useful if lineStyle was changed on graphics element) */
    setStrokeStyle(): Promise<void>;
    private static distance;
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number, closePath?: boolean): this;
    closePath(): void;
    circle(x: number, y: number, radius: number, points?: number, matrix?: Matrix): this;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, points?: number, matrix?: Matrix): this;
    poly(points: Point[] | number[], matrix?: Matrix): this;
    rect(x: number, y: number, width: number, height: number, matrix?: Matrix): this;
    roundRect(x: number, y: number, width: number, height: number, cornerRadius?: number, matrix?: Matrix): this;
    private drawDashedArc;
    private adjustStrokeStyle;
    private static getTexture;
    /**
     * Draws a dashed cubic Bezier curve from the current position to the specified end point.
     * @param cp1x - The x-coordinate of the first control point
     * @param cp1y - The y-coordinate of the first control point
     * @param cp2x - The x-coordinate of the second control point
     * @param cp2y - The y-coordinate of the second control point
     * @param x - The x-coordinate of the end point
     * @param y - The y-coordinate of the end point
     * @param smoothness - The smoothness factor for curve subdivision (default: 0.5)
     * @returns The instance of the current object for chaining
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number, smoothness?: number): this;
    /**
     * Draws a dashed quadratic curve from the current position to the specified end point.
     * @param cpx - The x-coordinate of the control point
     * @param cpy - The y-coordinate of the control point
     * @param x - The x-coordinate of the end point
     * @param y - The y-coordinate of the end point
     * @param smoothness - The smoothness factor for curve subdivision (default: 0.5)
     * @returns The instance of the current object for chaining
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number, smoothness?: number): this;
    /**
     * Adaptive subdivision of a cubic Bezier curve into line segments
     * @param x0 - Start point x
     * @param y0 - Start point y
     * @param x1 - First control point x
     * @param y1 - First control point y
     * @param x2 - Second control point x
     * @param y2 - Second control point y
     * @param x3 - End point x
     * @param y3 - End point y
     * @param smoothness - Smoothness factor (lower = more subdivisions)
     * @returns Array of points representing the curve
     */
    private adaptiveBezierSubdivision;
    /**
     * Adaptive subdivision of a quadratic curve into line segments
     * @param x0 - Start point x
     * @param y0 - Start point y
     * @param x1 - Control point x
     * @param y1 - Control point y
     * @param x2 - End point x
     * @param y2 - End point y
     * @param smoothness - Smoothness factor (lower = more subdivisions)
     * @returns Array of points representing the curve
     */
    private adaptiveQuadraticSubdivision;
    /**
     * Recursive Bezier subdivision
     */
    private subdivideBezier;
    /**
     * Recursive quadratic subdivision
     */
    private subdivideQuadratic;
}
