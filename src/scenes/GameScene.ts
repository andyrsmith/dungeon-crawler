import Phaser from 'phaser'
import TextureKeys from '../consts/TextureKeys'

export default class GameScene extends Phaser.Scene {
  private faune!: Phaser.Physics.Arcade.Sprite
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

    //Refactor: move into seperate file
    //Refactor: create anims const
    this.anims.create({
      key: 'faune-run-side',
      frames: this.anims.generateFrameNames(TextureKeys.Faune, {
        start: 1,
        end: 8,
        prefix: 'run-side-',
        suffix: '.png'
      }),
      frameRate: 15,
      repeat: -1 
    })

    this.anims.create({
      key: 'faune-run-up',
      frames: this.anims.generateFrameNames(TextureKeys.Faune, {
        start: 1,
        end: 8,
        prefix: 'run-up-',
        suffix: '.png'
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'faune-run-down',
      frames: this.anims.generateFrameNames(TextureKeys.Faune, {
        start: 1,
        end: 8,
        prefix: 'run-down-',
        suffix: '.png'
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'faune-idle-side',
      frames: [{
        key: TextureKeys.Faune,
        frame: 'walk-side-3.png'
      }]
    })

    this.anims.create({
      key: 'faune-idle-up',
      frames: [{
        key: TextureKeys.Faune,
        frame: 'walk-up-3.png'
      }]
    })

    this.anims.create({
      key: 'faune-idle-down',
      frames: [{
        key: TextureKeys.Faune,
        frame: 'walk-down-3.png'
      }]
    })

    const map = this.make.tilemap({
      key: TextureKeys.Dungeon
    })
  
    const tileSet = map.addTilesetImage('dungeon', TextureKeys.DungeonTiles, 16, 16, 1, 2)

    map.createStaticLayer(TextureKeys.GroundLayer, tileSet)
    const wallsLayer = map.createStaticLayer(TextureKeys.WallsLayer, tileSet)
    wallsLayer.setCollisionByProperty({ collides: true})

    //Refactor: create faune class
    this.faune = this.physics.add.sprite(100, 50, TextureKeys.Faune)
    this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)
    this.faune.play('faune-idle-side')

    this.cameras.main.startFollow(this.faune)

    this.physics.add.collider(this.faune, wallsLayer)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(t: number, dt: number) {
    if(!this.cursors) {
      return
    }

    const characterSpeed = 100

    if(this.cursors.left?.isDown) {
      this.faune.scaleX = -1
      this.faune.play('faune-run-side', true)
      this.faune.body.offset.x = 24
      this.faune.setVelocity(-characterSpeed, 0)
    } else if (this.cursors.right?.isDown) {
      this.faune.scaleX = 1
      this.faune.play('faune-run-side', true)
      this.faune.body.offset.x = 8
      this.faune.setVelocity(characterSpeed, 0) 
    } else if (this.cursors.down?.isDown) {
      this.faune.play('faune-run-down', true)
      this.faune.setVelocity(0, characterSpeed)
    } else if (this.cursors.up?.isDown) {
      this.faune.play('faune-run-up', true)
      this.faune.setVelocity(0, -characterSpeed)
    } else {
      const parts = this.faune.anims.currentAnim.key.split('-')
      this.faune.play(`faune-idle-${parts[2]}`)
      this.faune.setVelocity(0, 0)
    }
  }
}