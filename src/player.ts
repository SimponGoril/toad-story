import { Actor, Animation, AnimationStrategy, CircleCollider, CollisionType, Color, Engine, PostCollisionEvent, Timer, vec } from 'excalibur'
import { Block } from './block'
import { FrogSpriteSheet, Resources } from './resources'
import { Ui } from './ui'

export class Player extends Actor {
  private jumpVelocity = 0
  private maxJumpVelocity = 10
  private reversingVelocity = false
  private jumpingAnimation: Animation
  private isJumping = false
  private score = 0
  private ui: Ui

  private jumpingTimer = new Timer({
      fcn: () => {
        if (this.jumpVelocity === this.maxJumpVelocity) {
          this.reversingVelocity = true
        } else if (this.jumpVelocity === 0) {
          this.reversingVelocity = false
        }

        if (this.reversingVelocity) {
          this.jumpVelocity -= 1
        } else {
          this.jumpVelocity += 1
        }
        
        this.ui.setJumpBar(this.jumpVelocity)
      },
      repeats: true,
      interval: 100,
    })

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 50,
      height: 50,
      collisionType: CollisionType.Active,
      collider: new CircleCollider({radius: 20, offset: vec(0, 0)}),
      color: Color.Red
    })
  }

  public jump(velocity: number) {
    this.vel.y = velocity * -90
    this.vel.x = velocity * 30
  }

  private onMouseDown = () => {
    if (!this.isJumping) {
      this.jumpingTimer.start()
      console.log(this.jumpVelocity)
    }
  }  
  
  private onMouseUp = () => {
    if (!this.isJumping) {
      Resources.JumpSound.play()
      this.jumpingTimer.stop()
      this.graphics.use('jumping')
      this.jump(this.jumpVelocity)
      this.jumpVelocity = 0
      this.ui.hideJumpBar()
      this.isJumping = true
    }
  }

  onInitialize(e: Engine) {
    const idle = Animation.fromSpriteSheet(FrogSpriteSheet, [0,1,2,3], 100)
    idle.flipHorizontal = true
    this.graphics.add('idle', idle)
    this.graphics.use('idle')
    
    const falling = Animation.fromSpriteSheet(FrogSpriteSheet, [21], 100)
    falling.strategy = AnimationStrategy.Freeze
    falling.flipHorizontal = true
    this.graphics.add('falling', falling)

    this.jumpingAnimation = Animation.fromSpriteSheet(FrogSpriteSheet, [16,17,18,19,20,21], 100)
    this.jumpingAnimation.strategy = AnimationStrategy.Freeze
    this.jumpingAnimation.flipHorizontal = true
    this.graphics.add('jumping', this.jumpingAnimation)

    e.currentScene.add(this.jumpingTimer)
    e.input.pointers.primary.on('down', this.onMouseDown)
    e.input.pointers.primary.on('up', this.onMouseUp)
    this.ui = new Ui(e)
    this.on('postcollision', (evt) => this.onPostCollision(evt))
  }

  onPostCollision(evt: PostCollisionEvent) {
    if (evt.other instanceof Block) {
      if (this.body.vel.x >= 0) {
        this.body.vel.x -= 9
      }

      if ( this.body.vel.x < 0)  {
        this.body.vel.x = 0
      }

      this.graphics.use('idle')
      this.jumpingAnimation.reset()
      this.isJumping = false

      if (!evt.other.touched) {
        evt.other.touched = true
        this.ui.setScore(String(this.score++))
      }
    }
  }

  onPostUpdate(e: Engine) {
    if (this.vel.y > 0) {
      this.graphics.use('falling')
    }
  }
}
