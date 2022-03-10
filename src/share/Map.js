import DemoLower from '../../assets/images/maps/DemoLower.png'
import DemoUpper from '../../assets/images/maps/DemoUpper.png'
import heroImg from '../../assets/images/characters/people/hero.png'
import npc1Image from '../../assets/images/characters/people/npc1.png'
import { Person } from '../Person';
import {useGrid} from './utils'
export const Map = {
    DemoRoom: {
        lowerSrc: DemoLower,
        upperSrc: DemoUpper,
        gameObj: {
          hero: new Person({
            x: useGrid(5),
            y: useGrid(6),
            src:heroImg,
            isPlayer:true
          }),
          npc1: new Person({
            x: useGrid(7),
            y: useGrid(9),
            src: npc1Image
          })
        }
      }
}