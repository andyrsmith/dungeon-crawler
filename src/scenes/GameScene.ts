import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'
import {createFauneAnims} from '../anims/CharacterAnims'
import '../characters/Faune'
import Faune from '../characters/Faune'
import Lizard from '../enemies/Lizard'
import {createEnemiesAnims} from '../anims/EnemiesAnims'
import EventKeys from '../consts/EventKeys'
import { sceneEvents } from '../events/EventCenter'
import SceneKeys from '../consts/SceneKeys'
import Chest from '../items/Chest'
import { createChestAnims } from '../anims/ChestAnims'


export default class GameScene extends Phaser.Scene {
  private faune!: Faune
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private fauneLizardCollider!: Phaser.Physics.Arcade.Collider
  private weapons!: Phaser.Physics.Arcade.Group
  private lizards!: Phaser.Physics.Arcade.Group

  constructor() {
    super(SceneKeys.game)
  }

  preload() {

  }

  create() {
    this.scene.run('game-ui')
    createFauneAnims(this.anims)
    createEnemiesAnims(this.anims)
    createChestAnims(this.anims)
 
    const map = this.make.tilemap({
      key: TextureKeys.Dungeon
    })  
    const tileSet = map.addTilesetImage('dungeon', TextureKeys.DungeonTiles, 16, 16, 1, 2)
    map.createStaticLayer(TextureKeys.GroundLayer, tileSet)
    const wallsLayer = map.createStaticLayer(TextureKeys.WallsLayer, tileSet)
    wallsLayer.setCollisionByProperty({ collides: true})

    this.weapons = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,

    })    
    this.faune = this.add.faune(100, 50, TextureKeys.Faune)
    this.faune.setDepth(1)
    this.faune.setWeapon(this.weapons)     
    this.cameras.main.startFollow(this.faune)

    //this.physics.add.sprite(100, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png')
    //const lizard = this.physics.add.existing(new Lizard (this, 100, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png'))
    //this.physics.world.enable([ lizard ]);

    this.lizards = this.physics.add.group({
      classType: Lizard,
      createCallback: (go) => {
        const lizGo = go as Lizard
        lizGo.body.onCollide = true
        lizGo.body.setSize(lizGo.width, lizGo.height * 0.6)
        lizGo.body.offset.y = lizGo.y * 0.15
      }
    })
    this.lizards.get(250, 80, TextureKeys.Lizard, 'lizard_m_idle_anim_f0.png')

    const chests = this.physics.add.staticGroup({
      classType: Chest
    })
    chests.get(250, 120, TextureKeys.Chest, 'chest_empty_open_anim_f0.png')


    this.physics.add.collider(this.faune, wallsLayer)
    this.physics.add.collider(this.lizards, wallsLayer)
    this.physics.add.collider(this.lizards, chests)
    this.physics.add.collider(this.faune.Weapon, this.lizards, this.weaponLizardCollusion, undefined, this)
    this.physics.add.collider(chests, this.faune, this.handlePlayerChestCollusion, undefined, this)
    this.fauneLizardCollider = this.physics.add.collider(this.faune, this.lizards, this.fauneLizardCollusion, undefined, this)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(t: number, dt: number) {    
    if(this.faune) {
      this.faune.update(this.cursors)
    }
  }

  handlePlayerChestCollusion(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const chest = obj2 as Chest
    this.faune.setActiveChest(chest)
  }
  
  fauneLizardCollusion(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const lizard = obj2 as Lizard

    const dx = this.faune.x - lizard.x
    const dy = this.faune.y - lizard.y

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    this.faune.handleDamage(dir)

    sceneEvents.emit(EventKeys.PlayerHealthChange, this.faune.Health)

    if(this.faune.Health <= 0) {
      this.fauneLizardCollider.destroy()
    }

  }

  weaponLizardCollusion(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const lizard = obj2 as Lizard
    //lizard and weapon body do not destory
    this.lizards.killAndHide(lizard)
    this.lizards.remove(lizard)
  }
}