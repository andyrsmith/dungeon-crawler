import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import AnimsKeys from '../consts/AnimsKeys'

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(x: number, y: number, texture: string, frame?: string | number)
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  private hit = 0
  private _health = 3
  private healtState = HealthState.IDLE
  private damageTime = 0
  private weapons!: Phaser.Physics.Arcade.Group
  private attacking = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.play('faune-idle-side')

  }

  get Health() {
    return this._health
  }

  get Weapon( ) {
    return this.weapons
  }
  //Is load the weapon ahead of time and make it appear when space
  // or load the weapon when space bar is hit
  setWeapon(weapons) {
    this.weapons = weapons
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)

    switch (this.healtState) {
      case HealthState.IDLE: 
        break
      case HealthState.DAMAGE:
        this.damageTime += dt
        if(this.damageTime > 250) {
          this.healtState = HealthState.IDLE
          this.setTint(0xffffff)
          this.damageTime = 0
        }
        break
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if(!cursors) {
      return
    }

    if(this.healtState === HealthState.DAMAGE || this.healtState === HealthState.DEAD || this.attacking) {
      return
    }

    if(Phaser.Input.Keyboard.JustDown(cursors.space!)) {
      const parts = this.anims.currentAnim.key.split('-')
      this.play(`faune-idle-${parts[2]}`)
      this.setVelocity(0, 0)
      this.useWeapon()
      return
    }

    const characterSpeed = 100
    if(cursors.left?.isDown) {
      this.scaleX = -1
      this.play(AnimsKeys.FauneRunSide, true)
      this.body.offset.x = 24
      this.setVelocity(-characterSpeed, 0)
    } else if (cursors.right?.isDown) {
      this.scaleX = 1
      this.play(AnimsKeys.FauneRunSide, true)
      this.body.offset.x = 8
      this.setVelocity(characterSpeed, 0) 
    } else if (cursors.down?.isDown) {
      this.play(AnimsKeys.FauneRunDown, true)
      this.setVelocity(0, characterSpeed)
    } else if (cursors.up?.isDown) {
      this.play(AnimsKeys.FauneRunUp, true)
      this.setVelocity(0, -characterSpeed)
    } else {
      const parts = this.anims.currentAnim.key.split('-')
      this.play(`faune-idle-${parts[2]}`)
      this.setVelocity(0, 0)
    }
  }

  useWeapon() {

    let weaponX = this.x;
    let weaponY = this.y;
    let angle = 0;
    let heightMultipler = 1
    let widthMultipler = 1

    const parts = this.anims.currentAnim.key.split('-')
    const direction = parts[2]
    this.attacking = true
    if(direction === 'up') {
      weaponY = weaponY - this.body.height + 10
    } else if (direction === 'side' && this.scaleX === -1) {
      weaponX = weaponX - 10
      weaponY = weaponY + 5
      angle = 270
      heightMultipler = 0.5
      widthMultipler = 1.5
    } else if (direction == 'side' && this.scaleX === 1) {
      weaponX = weaponX + 10
      weaponY = weaponY + 5
      angle = 90
      heightMultipler = 0.5
      widthMultipler = 1.5
    } else if(direction === 'down') {
      weaponY = weaponY + this.body.height - 10
      angle = 180
    }

    const weapon = this.weapons.get(weaponX, weaponY,  TextureKeys.RedGemSword) as Phaser.Physics.Arcade.Image;
    weapon.body.setSize(weapon.width * widthMultipler, weapon.height * heightMultipler)

    weapon.setActive(true)
    weapon.setVisible(true)
    weapon.setAngle(angle)

    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.weapons.killAndHide(weapon)
        this.weapons.remove(weapon)
        this.attacking = false
      }
    })
  }

  handleDamage(dir: Phaser.Math.Vector2) {

    if(this.healtState === HealthState.DAMAGE) {
      return
    }

    this._health--

    if(this.Health <= 0) {
      this.healtState = HealthState.DEAD
      this.play(AnimsKeys.FauneFaint)
      this.setVelocity(0, 0)
    } else {
      this.healtState = HealthState.DAMAGE
      this.setVelocity(dir.x, dir.y)
      this.setTint(0xff0000)
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register('faune', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
  let sprite = new Faune(this.scene, x, y, texture, frame)

  this.displayList.add(sprite)
  this.updateList.add(sprite)

  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
  sprite.body.setSize(sprite.width * 0.5, sprite.width * 0.8)

  return sprite
})