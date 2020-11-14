import Phaser from 'phaser'
import Enemies from './Enemies'
import AnimsKeys from '../consts/AnimsKeys'

export default class MaskedOrc extends Enemies {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.setHealth(1)
    this.play(AnimsKeys.MaskedOrcIdle)
  }
}