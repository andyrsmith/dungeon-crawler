import Phaser from 'phaser'
import Enemies from './Enemies'
import AnimsKeys from '../consts/AnimsKeys'

export default class MaskedOrc extends Enemies {
  private knifes: Phaser.Physics.Arcade.Group

  get Knifes() {
    return this.knifes
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, moveDelay?: number) {
    super(scene, x, y, texture, frame, moveDelay)
    this.setHealth(1)
    this.setMoveSpeed(25)
    this.resetMoveDelay(1000)
    this.play(AnimsKeys.MaskedOrcIdle)

    this.knifes = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: -1
    })

    this.setWeapon(this.knifes)

    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.throwWeapon()
      },
      loop: true
    })
  }
}