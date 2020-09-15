import Phaser from 'phaser'
import AnimsKeys from '../consts/AnimsKeys'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(x: number, y: number, texture: string, frame?: string | number)
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.play('faune-idle-side')

  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if(!cursors) {
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
}

Phaser.GameObjects.GameObjectFactory.register('faune', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
  let sprite = new Faune(this.scene, x, y, texture, frame)

  this.displayList.add(sprite)
  this.updateList.add(sprite)

  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
  sprite.body.setSize(sprite.width * 0.5, sprite.width * 0.8)

  return sprite
})