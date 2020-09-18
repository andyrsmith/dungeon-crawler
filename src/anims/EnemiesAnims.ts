import Phaser from 'phaser'
import AnimsKeys from '../consts/AnimsKeys'
import TextureKeys from '../consts/TextureKeys'

const createEnemiesAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: AnimsKeys.LizardIdle,
    frames: anims.generateFrameNames(TextureKeys.Lizard, { start: 0, end: 3, prefix: 'lizard_m_idle_anim_f' , suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })

  anims.create({
    key: AnimsKeys.LizardRun,
    frames: anims.generateFrameNames(TextureKeys.Lizard, { start: 0, end: 3, prefix: 'lizard_m_run_anim_f' , suffix: '.png'}),
    repeat: -1,
    frameRate: 10
  })
}

export {
  createEnemiesAnims
}