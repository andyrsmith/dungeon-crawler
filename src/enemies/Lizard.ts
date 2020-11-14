import Phaser from 'phaser'
import Enemies from './Enemies'
import AnimsKey from '../consts/AnimsKeys'

export default class Lizard extends Enemies {


  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.setHealth

    this.play(AnimsKey.LizardIdle)


  }
}