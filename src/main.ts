import Phaser from 'phaser'

import GameScene from './scenes/GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [GameScene],
  scale: {
    zoom: 2
  }
}

export default new Phaser.Game(config)