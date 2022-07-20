import { Actor, Axis, Camera, CameraStrategy, Engine, Scene, vec, Vector } from 'excalibur'
import { Block } from './block'
import { Player } from './player'
import { Resources } from './resources'

export class Level extends Scene {
    private player: Player
    private blocks: Block[] = []
    private levelTiles = 100

    constructor() {
        super()
    }

    onInitialize(engine: Engine) {
        this.setupLevel(engine)
    }

    private getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    private setupLevel(engine: Engine) {
        // Compose actors in scene
        this.player = new Player(50, engine.halfDrawHeight * 2 - 100)
        this.blocks.push(new Block(0, engine.halfDrawHeight * 2 - 70))


        for (let i = 0; i < this.levelTiles; i+=2) {
            this.blocks.push(new Block(i * 150 + 200, (this.getRandomInt(300) * -1) + 500))
        }

        for (let b of this.blocks) {
            this.add(b)
        }

        this.add(this.player)
        this.camera.clearAllStrategies()
        //this.camera.strategy.lockToActorAxis(this.player, Axis.X)
        this.camera.addStrategy(new CustomCamera(this.player)) 

    }

    private clearLevel() {
        for (let b of this.blocks) {
            this.remove(b)
        }

        this.blocks = []

        this.remove(this.player)
    }

    onPostUpdate(engine: Engine, _delta: number): void {
        if (Math.round(this.player.pos.y) > 800) {
            Resources.DeathSound.play()
            this.clearLevel()
            this.setupLevel(engine)
        }
    }
}

class CustomCamera implements CameraStrategy<Actor> {
    target: Actor
    action: (target: Actor, camera: Camera, engine: Engine, delta: number) => Vector = 
        (target: Actor, camera: Camera, engine: Engine, delta: number) => {
            return vec(target.pos.x + engine.halfCanvasWidth / 4, engine.halfDrawHeight)
        }
    
        constructor(actor) {
            this.target = actor
        }
    }

