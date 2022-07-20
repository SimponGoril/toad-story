import { Actor, CollisionType, Engine, Shape, Sprite, vec, Vector } from 'excalibur'
import { Resources } from './resources'

export class Block extends Actor {
  public touched = false

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 200,
      height: 50,
      collisionType: CollisionType.Fixed,
      anchor: Vector.Zero,
      collider: Shape.Box(190, 20, undefined, vec(100, 10)),
    })
  }

  onInitialize(e: Engine) {
    this.graphics.use(Sprite.from(Resources.Block))
  }

}
