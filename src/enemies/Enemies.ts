import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
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
//TODO refactor do not start moving until movement has been set
export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT
  private moveEvent!: Phaser.Time.TimerEvent
  private healthState = HealthState.IDLE
  private damageTime = 0
  private health = 2
  private moveSpeed = 50
  private moveDelay: number
  private weapon!: Phaser.Physics.Arcade.Group

  get Weapon() {
    return this.weapon
  }

  setHealthState(health: HealthState) {
    this.healthState = health
  }

  setHealth(health: number) {
    this.health = health
  }

  setMoveSpeed(speed: number) {
    this.moveSpeed = speed
  }

  setMoveDelay(delay: number) {
    this.moveDelay = delay
  }

  resetMoveDelay(delay: number) {
    this.moveEvent.destroy()
    this.setMoveDelay(delay)
    this.startMoveDelay()
  }

  setWeapon(weapon: Phaser.Physics.Arcade.Group) {
    this.weapon = weapon
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, moveDelay?: number) {
    super(scene, x, y, texture, frame)

    this.moveDelay = moveDelay ? moveDelay : 2000
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)

    this.startMoveDelay()
  }

  startMoveDelay() {
    this.moveEvent = this.scene.time.addEvent({
      delay: this.moveDelay,
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

    switch(this.direction) {
      case Direction.UP:
        this.setVelocity(0, -this.moveSpeed)
        break
      case Direction.DOWN:
        this.setVelocity(0, this.moveSpeed)
        break
      case Direction.LEFT:
        this.setVelocity(-this.moveSpeed, 0)
        break
      case Direction.RIGHT:
        this.setVelocity(this.moveSpeed, 0)
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

  throwWeapon() {
    if(!this.weapon) {
      return
    }

    const knife = this.weapon?.get(this.x, this.y, TextureKeys.Knife) as Phaser.Physics.Arcade.Image

    if(!knife) {
      return
    }
    const vec = new Phaser.Math.Vector2(0,0)

    switch(this.direction){ 
      //Physics body needs updated for up and down
      case Direction.UP:
        vec.y = -1
        break
      case Direction.DOWN:
        vec.y = 1
        break
      case Direction.LEFT:
        vec.x = -1
        break
      default:
        vec.x = 1
        break
    }
    knife.body.enable = true

    const angle = vec.angle()

    knife.setActive(true)
    knife.setVisible(true)

    knife.setRotation(angle)
    knife.x += vec.x + 8
    knife.y += vec.y + 8
    knife.setVelocity(vec.x * 300, vec.y * 300)

  }
}