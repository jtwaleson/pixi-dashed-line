import { 
    Application, 
    Graphics, 
    Text,
    LineCap,
    LineJoin
} from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { DashLine } from '../lib'

let viewport: Viewport, g: Graphics, x2: number, y2: number

let useTexture = false

function checkbox() {
    return document.querySelector('#use-texture') as HTMLInputElement
}

async function setup() {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const application = new Application({
        view: canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        backgroundAlpha: 0,
    })
    await application.init()
    viewport = application.stage.addChild(new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        passiveWheel: false,
        stopPropagation: true,
        events: application.renderer.events
    }))
    viewport.pinch().wheel().decelerate().drag()
    g = viewport.addChild(new Graphics())
    viewport.on('zoomed', () => draw())
    y2 = window.innerHeight - 100
    x2 = window.innerWidth - 100
    checkbox().checked = useTexture
    checkbox().addEventListener('change', () => {
        useTexture = !useTexture
        draw()
    })
}

function drawScalingRectangle() {
    const scale = 1 / viewport.scale.x
    const dash = new DashLine(g, {
        dash: [20, 10],
        width: 5,
        scale,
        useTexture,
        color: 0,
        alignment: 1,
    })
    dash.rect(100, 100, x2 - 100, y2 - 100)

    const text = g.addChild(new Text({
        text: 'This rectangle\'s outline size remains constant when zooming',
        style: { fill: 'black', fontSize: 15 }
    }))
    text.position.set(x2 - text.width, 100 - text.height - 5)
}

function drawJoinCapRectangle() {
    const dash = new DashLine(g, {
        dash: [20, 5],
        width: 3,
        color: 0xaa00aa,
        useTexture,
        cap: 'round',
        join: 'round',
    })
    dash.rect(150, 150, x2 - 200, y2 - 200)

    const text = g.addChild(new Text({
        text: 'Using cap and joins (only works when useTexture: false)',
        style: { fill: 'black', fontSize: 15 }
    }))
    text.position.set(x2 - 50 - text.width, 150 - text.height - 5)
}

function drawCircle() {
    const dash = new DashLine(g, {
        dash: [10, 5],
        width: 3,
        color: 0x0000aa,
        useTexture,
    })
    const x = window.innerWidth / 2
    const y = window.innerHeight / 2
    dash.circle(x, y, 100)
}

function drawTinyCircle() {
    const dash = new DashLine(g, {
        dash: [10, 5],
        width: 0.5,
        color: 0xaa00aa,
        useTexture,
    })
    const x = window.innerWidth / 2
    const y = window.innerHeight / 2
    dash.circle(x, y, 5)
}

function drawEllipse() {
    const dot = new DashLine(g, {
        dash: [3, 3],
        width: 3,
        color: 0x00aa00,
        useTexture,
    })
    const x = window.innerWidth / 2
    const y = window.innerHeight / 2
    dot.ellipse(x, y, 300, 200)
}

function drawPolygon() {
    const dash = new DashLine(g, {
        width: 2,
        color: 0xaa0000,
        useTexture,
    })
    const x = window.innerWidth / 2
    const y = window.innerHeight / 2
    const size = 20
    dash.poly([x, y - size, x - size, y + size, x + size, y + size, x, y - size])
}

function draw() {
    g.removeChildren()
    g.clear()
    drawScalingRectangle()
    drawJoinCapRectangle()
    drawCircle()
    drawTinyCircle()
    drawEllipse()
    drawPolygon()
}

function keyboard() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            viewport.zoom(1, true)
            draw()
        }
        if (event.key === 'ArrowDown') {
            viewport.zoom(-1, true)
            draw()
        }
    })
}

setup()
draw()
keyboard()