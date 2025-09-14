import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import {sceneEvents} from '../events/EventCenter'
import EventKeys from '../consts/EventKeys'
import SceneKeys from '../consts/SceneKeys'

export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group
  private coins: number
  private coinText!: Phaser.GameObjects.Text

  constructor() {
    super({ key: SceneKeys.gameUI})
    this.coins = 0
  }

  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image
    })

    this.hearts.createMultiple({
      key: TextureKeys.FullHeart,
      setXY: {
        x: 10,
        y: 10,
        stepX: 16
      },
      quantity: 3
    })
    
    this.coinText = this.add.text(355, 2, this.coins.toString(), {
      fontSize: '20px'
    })

    const coin = this.add.image(385, 10, TextureKeys.Chest, 'coin_anim_f0.png')
    coin.scale = 2

    sceneEvents.on(EventKeys.PlayerHealthChange, this.updateHearts, this)

    sceneEvents.on(EventKeys.CoinValueChange, this.updateCoinValue, this)

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(EventKeys.PlayerHealthChange, this.updateHearts)
    })
  }

  updateCoinValue(coins: number) {
    console.log(coins)
    this.coinText.text = coins.toString()
  }

  updateHearts(health: number) {
    this.hearts.children.each((child, idx) => {
      const heart = child as Phaser.GameObjects.Image
      if(idx >= health) {
        heart.setTexture(TextureKeys.EmptyHeart)
      }
    });
  }
}
