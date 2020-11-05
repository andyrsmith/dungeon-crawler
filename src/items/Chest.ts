import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import AnimsKeys from '../consts/AnimsKeys'
import items from '../consts/ItemsKeys'

export default class Chest extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number | string) {
    super(scene, x, y, texture, frame)

    this.play(AnimsKeys.chestClose)
  }

  open() {
    if(this.anims.currentAnim.key !== AnimsKeys.chestClose) {
      return {}
    }
      this.play(AnimsKeys.chestOpen)
      const coinValue = Phaser.Math.Between(1, 5)
      const coin = this.scene.physics.add.sprite(this.x, this.y - 1, TextureKeys.Chest, 'coin_anim_f0.png')
      coin.play(AnimsKeys.coin)

      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          coin.destroy()
        }
      })

      return {
        itemName: items.coin,
        value: coinValue
      }

  }
}