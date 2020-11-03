import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SceneKeys.gameOver)
  }

  create() {
    this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, "Game Over", {
      fontSize: "16px",
      color: "#ffffff",
      shadow: { fill: true, blur: 0, offsetY: 0},
      padding: { left: 15, right: 15, top: 10, bottom: 10}

    }).setOrigin(0.5)

    this.add.text(this.scale.width * 0.5, this.scale.height * 0.6, "Press Spacebar to Try Again", {
      fontSize: "12px",
      color: "#ffffff",
      shadow: { fill: true, blur: 0, offsetY: 0}

    }).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.stop(SceneKeys.gameOver)
      this.scene.stop(SceneKeys.game)
      this.scene.start(SceneKeys.game)
    })
  }
}