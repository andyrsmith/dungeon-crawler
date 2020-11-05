import Phaser from 'phaser'
import AnimsKeys from '../consts/AnimsKeys'
import TextureKeys from '../consts/TextureKeys'

const createChestAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: AnimsKeys.chestOpen,
    frames: anims.generateFrameNames(TextureKeys.Chest, { 
      start: 0,
      end: 2,
      prefix: 'chest_empty_open_anim_f',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: 0
  })

  anims.create({
    key: AnimsKeys.chestClose,
    frames: [{key: TextureKeys.Chest, frame: 'chest_empty_open_anim_f0.png'}],
    repeat: 0,
    frameRate: 5
  })

  anims.create({
    key: AnimsKeys.coin,
    frames: anims.generateFrameNames(TextureKeys.Chest, {
      start: 0,
      end: 3,
      prefix: 'coin_anim_f',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: 0
  })
}

export {
  createChestAnims
}