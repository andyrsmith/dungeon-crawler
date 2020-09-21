import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import {createFauneAnims} from '../anims/CharacterAnims'
import '../characters/Faune'
import Faune from '../characters/Faune'
import Lizard from '../enemies/Lizard'
import {createEnemiesAnims} from '../anims/EnemiesAnims'


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
    this.load.atlas(TextureKeys.Lizard, 'images/enemies/lizard.png', 'images/enemies/lizard.json')

  }

  create() {

    createFauneAnims(this.anims)
    createEnemiesAnims(this.anims)
 
    const map = this.make.tilemap({
      key: TextureKeys.Dungeon
    })
  
    const tileSet = map.addTilesetImage('dungeon', TextureKeys.DungeonTiles, 16, 16, 1, 2)

    map.createStaticLayer(TextureKeys.GroundLayer, tileSet)
    const wallsLayer = map.createStaticLayer(TextureKeys.WallsLayer, tileSet)
    wallsLayer.setCollisionByProperty({ collides: true})

    this.faune = this.add.faune(100, 50, TextureKeys.Faune)
    this.cameras.main.startFollow(this.faune)

    //this.physics.add.sprite(100, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png')
    //const lizard = this.physics.add.existing(new Lizard (this, 100, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png'))
    //this.physics.world.enable([ lizard ]);
    const lizards = this.physics.add.group({
      classType: Lizard,
      createCallback: (go) => {
        const lizGo = go as Lizard
        lizGo.body.onCollide = true
      }
    })

    lizards.get(250, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png')

    this.physics.add.collider(this.faune, wallsLayer)
    this.physics.add.collider(lizards, wallsLayer)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(t: number, dt: number) {
    if(this.faune) {
      this.faune.update(this.cursors)
    }
  }
}