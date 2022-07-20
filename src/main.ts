import { Color, Engine, Loader, Physics, vec } from 'excalibur'
import { Level } from './level'
import { Resources } from './resources'
import '../index.css'
import { LOADER_LOGO } from './logo'

class Game extends Engine {

    constructor() {
      super({canvasElementId: 'game'})
    }

    initialize() {
      // TODO: this should be done better. Prevents text selection popup on mobiles
      document.getElementsByClassName('noselect')[0].addEventListener('touchstart', function(e) { e.preventDefault() })
      document.getElementsByClassName('noselect')[1].addEventListener('touchstart', function(e) { e.preventDefault() })
      document.getElementsByTagName('body')[0].addEventListener('touchstart', function(e) { e.preventDefault() })
      const loader = new Loader([Resources.Frog, Resources.Block, Resources.JumpSound, Resources.DeathSound])
      loader.backgroundColor = '#000000'
      loader.loadingBarColor = Color.fromHex('#00FF0D')
      loader.logo = LOADER_LOGO
      loader.logoWidth = 600
      loader.logoHeight = 320
      loader.playButtonText = "Play!"
      Physics.acc = vec(0, 800)
      const level = new Level()

      this.add('level', level)
      this.goToScene('level')
      this.start(loader)
    }
  }
  
  export const game = new Game()
  game.initialize()