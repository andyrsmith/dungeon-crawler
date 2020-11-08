import Phaser from 'phaser'
import AnimsKey from '../consts/AnimsKeys'

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

enum HealthState {
  IDLE,
  DAMAGE
}

const randomDirection = (exclude: Direction) => {
  let newDirection = Phaser.Math.Between(0, 3)
  while(newDirection === exclude) {
    newDirection = Phaser.Math.Between(0,3)
  }

  return newDirection
}

export default class Lizard extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT
  private moveEvent: Phaser.Time.TimerEvent
  private healthState = HealthState.IDLE
  private damageTime = 0
  private health = 2

  setHealthState(health: HealthState) {
    this.healthState = health
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.play(AnimsKey.LizardIdle)

    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction)
      },
      loop: true
    })
  }

  handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {

    if(go !== this) {
      return
    }
    this.direction = randomDirection(this.direction)
  }

  handleDamage(dir: Phaser.Math.Vector2) {
    if(this.healthState !== HealthState.DAMAGE) {
      this.health--
    }
    this.healthState = HealthState.DAMAGE
    if(this.health <= 0) {
      this.destroy()
    }
    this.setTint(0xff0000)
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)


    switch (this.healthState) {
      case HealthState.IDLE: 
        break
      case HealthState.DAMAGE:
        this.damageTime += dt
        if(this.damageTime > 500) {
          this.healthState = HealthState.IDLE
          this.setTint(0xffffff)
          this.damageTime = 0
        }
        break
    }

    const speed = 50

    switch(this.direction) {
      case Direction.UP:
        this.setVelocity(0, -speed)
        break
      case Direction.DOWN:
        this.setVelocity(0, speed)
        break
      case Direction.LEFT:
        this.setVelocity(-speed, 0)
        break
      case Direction.RIGHT:
        this.setVelocity(speed, 0)
        break
      default:
        this.setVelocity(0, 0)
        break
    }
  }

  destroy(fromScene?: boolean) {
    this.moveEvent.destroy()
    super.destroy(fromScene)
  }
}