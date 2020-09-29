import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'
import {sceneEvents} from '../events/EventCenter'
import EventKeys from '../consts/EventKeys'

export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group

  constructor() {
    super({ key: 'game-ui'})
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

    sceneEvents.on(EventKeys.PlayerHealthChange, this.updateHearts, this)

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(EventKeys.PlayerHealthChange, this.updateHearts)
    })
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