import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import WebFontFile from '../utilities/webFontFile'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.preload)
  }

  preload() {
    this.load.image(TextureKeys.DungeonTiles, 'images/dungeon/dungeon_tiles_extruded.png')
    this.load.tilemapTiledJSON(TextureKeys.Dungeon, 'images/dungeon/dungeon-01.json')
    this.load.atlas(TextureKeys.Faune, 'images/characters/faune.png', 'images/characters/faune.json')
    this.load.atlas(TextureKeys.Lizard, 'images/enemies/lizard.png', 'images/enemies/lizard.json')
    this.load.atlas(TextureKeys.MaskedOrc, 'images/enemies/masked-orc.png', 'images/enemies/masked-orc.json')
    this.load.atlas(TextureKeys.Chest, 'images/items/treasure.png', 'images/items/treasure.json')
    this.load.image(TextureKeys.FullHeart, 'images/ui/ui_heart_full.png')
    this.load.image(TextureKeys.EmptyHeart, 'images/ui/ui_heart_empty.png')
    this.load.image(TextureKeys.RedGemSword, 'images/items/weapon_red_gem_sword.png')
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))
    this.load.image(TextureKeys.Knife, 'images/items/weapon_knife.png')
  }

  create() {
    this.scene.start(SceneKeys.titleScene)
  }
}