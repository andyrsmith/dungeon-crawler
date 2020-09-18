import Phaser from 'phaser'
import AnimsKey from '../consts/AnimsKeys'

export default class Lizard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.play(AnimsKey.LizardIdle)

  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)

    const speed = 50

    //this.setVelocity(speed, 0)
  }
}