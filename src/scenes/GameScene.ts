import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {
    this.load.image(TextureKeys.DungeonTiles, 'images/dungeon/dungeon_tiles_extruded.png')
    this.load.tilemapTiledJSON(TextureKeys.Dungeon, 'images/dungeon/dungeon-01.json')
    this.load.atlas(TextureKeys.Faune, 'images/characters/faune.png', 'images/characters/faune.json')

  }

  create() {
    const map = this.make.tilemap({
      key: TextureKeys.Dungeon
    })
  
    const tileSet = map.addTilesetImage('dungeon', TextureKeys.DungeonTiles, 16, 16, 1, 2)

    map.createStaticLayer(TextureKeys.GroundLayer, tileSet)
    map.createStaticLayer(TextureKeys.WallsLayer, tileSet)

    this.physics.add.sprite(100, 50, TextureKeys.Faune, 'walk-down-3.png')
  }
}