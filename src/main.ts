import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
import GameUI from './scenes/GameUI'
import PreloadScene from './scenes/PreloadScene'
import GameOver from './scenes/GameOver'
import TitleScene from './scenes/TitleScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [PreloadScene, TitleScene, GameScene, GameUI, GameOver],
  scale: {
    zoom: 2
  }
}

export default new Phaser.Game(config)