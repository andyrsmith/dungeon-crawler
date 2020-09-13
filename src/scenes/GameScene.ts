import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {

  }

  create() {
    this.add.text(400, 300, "Welcome to my Game")
  }
}