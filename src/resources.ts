import {  ImageSource, Sound, SpriteSheet } from 'excalibur'
import frog from './images/frog.png' // for parcelv2 this is configured in the .parcelrc
import block from './images/floor.png'
import jumpSound from './sounds/jump.wav'
import deathSound from './sounds/death.wav'

let Resources = {
  Frog: new ImageSource(frog),
  Block: new ImageSource(block),
  JumpSound: new Sound(jumpSound),
  DeathSound: new Sound(deathSound),
}

const FrogSpriteSheet = SpriteSheet.fromImageSource({
  image:Resources.Frog, 
  grid: { 
      columns: 8,
      rows: 3, 
      spriteWidth: 50,
      spriteHeight: 50,
  }
})

export { Resources, FrogSpriteSheet }