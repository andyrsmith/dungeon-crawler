import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import {createFauneAnims} from '../anims/CharacterAnims'
import AnimsKeys from '../consts/AnimsKeys'
import '../characters/Faune'
import Faune from '../characters/Faune'


export default class GameScene extends Phaser.Scene {
  private faune!: Faune
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('game')
  }

  preload() {
    this.load.image(TextureKeys.DungeonTiles, 'images/dungeon/dungeon_tiles_extruded.png')
    this.load.tilemapTiledJSON(TextureKeys.Dungeon, 'images/dungeon/dungeon-01.json')
    this.load.atlas(TextureKeys.Faune, 'images/characters/faune.png', 'images/characters/faune.json')

  }

  create() {

    createFauneAnims(this.anims)
 
    const map = this.make.tilemap({
      key: TextureKeys.Dungeon
    })
  
    const tileSet = map.addTilesetImage('dungeon', TextureKeys.DungeonTiles, 16, 16, 1, 2)

    map.createStaticLayer(TextureKeys.GroundLayer, tileSet)
    const wallsLayer = map.createStaticLayer(TextureKeys.WallsLayer, tileSet)
    wallsLayer.setCollisionByProperty({ collides: true})

    this.faune = this.add.faune(100, 50, TextureKeys.Faune)
    this.cameras.main.startFollow(this.faune)

    this.physics.add.collider(this.faune, wallsLayer)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(t: number, dt: number) {
    if(this.faune) {
      this.faune.update(this.cursors)
    }
  }
}