import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {
    this.load.image('dungeon-tiles', 'images/dungeon/dungeon_tiles_extruded.png')
    this.load.tilemapTiledJSON('dungeon', 'images/dungeon/dungeon-01.json')
    this.load.atlas('faune', 'images/characters/faune.png', 'images/characters/faune.json')

  }

  create() {
    const map = this.make.tilemap({
      key: 'dungeon'
    })

    const tileSet = map.addTilesetImage('dungeon', 'dungeon-tiles', 16, 16, 1, 2)

    map.createStaticLayer('Ground', tileSet)
    map.createStaticLayer('Walls', tileSet)

    this.physics.add.sprite(100, 50, 'faune', 'walk-down-3.png')
  }
}