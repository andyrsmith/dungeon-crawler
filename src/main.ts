import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
import GameUI from './scenes/GameUI'
import PreloadScene from './scenes/PreloadScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [PreloadScene, GameScene, GameUI],
  scale: {
    zoom: 2
  }
}

export default new Phaser.Game(config)