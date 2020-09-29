import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import AnimsKeys from '../consts/AnimsKeys'

const createFauneAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: AnimsKeys.FauneRunSide,
    frames: anims.generateFrameNames(TextureKeys.Faune, {
      start: 1,
      end: 8,
      prefix: 'run-side-',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1 
  })

  anims.create({
    key: AnimsKeys.FauneRunUp,
    frames: anims.generateFrameNames(TextureKeys.Faune, {
      start: 1,
      end: 8,
      prefix: 'run-up-',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1
  })

  anims.create({
    key: AnimsKeys.FauneRunDown,
    frames: anims.generateFrameNames(TextureKeys.Faune, {
      start: 1,
      end: 8,
      prefix: 'run-down-',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1
  })

  anims.create({
    key: AnimsKeys.FauneIdleSide,
    frames: [{
      key: TextureKeys.Faune,
      frame: 'walk-side-3.png'
    }]
  })

  anims.create({
    key: AnimsKeys.FauneIdleUp,
    frames: [{
      key: TextureKeys.Faune,
      frame: 'walk-up-3.png'
    }]
  })

  anims.create({
    key: AnimsKeys.FauneIdleDown,
    frames: [{
      key: TextureKeys.Faune,
      frame: 'walk-down-3.png'
    }]
  })

  anims.create({
    key: AnimsKeys.FauneFaint,
    frames: anims.generateFrameNames(TextureKeys.Faune, {
      start: 1,
      end: 4,
      prefix: 'faint-',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: 0
  })

}

export {
  createFauneAnims
}