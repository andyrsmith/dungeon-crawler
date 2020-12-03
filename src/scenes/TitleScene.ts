import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'

export default class TitleScene extends Phaser.Scene {
  constructor(){
    super(SceneKeys.titleScene)
  }

  create() {
    //sets new background just for this scene
    this.cameras.main.setBackgroundColor(0xd9d27d)
    //graphics is a way to draw shaps; differences between graphics and the rect and circle methods
    const graphics = this.add.graphics();
    //creates a line, args lineWidth, color, alpha: what is alpha?
    graphics.lineStyle(4,  0x5abd38 , 1)
    //x: top left, y: top left, width, height, radius
    graphics.strokeRoundedRect(10, 10, 375, 230, 10)
    // graphics.lineStyle(4, 0xff00ff, 1)
    // graphics.strokeRoundedRect(360, 240, 400, 300, {tl: 64, tr: 22, bl: 12, br: 0})

    this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, "Dungeon Crawler", {
      fontSize: "24px",
      fontFamily: '"Press Start 2P"',
      color: "#74b8a8",
      strokeThickness: 2,
      shadow: { fill: true, blur: 0, offsetY: 0},
      padding: { left: 15, right: 15, top: 10, bottom: 10}

    }).setOrigin(0.5)

    this.add.text(this.scale.width * 0.5, this.scale.height * 0.6, "Press Spacebar to Play", {
      fontSize: "8px",
      fontFamily: '"Press Start 2P"',
      color: "#ffffff",
      shadow: { fill: true, blur: 0, offsetY: 0}

    }).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.stop(SceneKeys.titleScene)
      this.scene.start(SceneKeys.game)
    })
  }
}