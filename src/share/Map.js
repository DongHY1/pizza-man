import DemoLower from '../../assets/images/maps/DemoLower.png'
import DemoUpper from '../../assets/images/maps/DemoUpper.png'
import heroImg from '../../assets/images/characters/people/hero.png'
import npc1Image from '../../assets/images/characters/people/npc1.png'
import npc2Image from '../../assets/images/characters/people/npc2.png'
import { Person } from '../Person';
import {useGrid,wallsLocation} from './utils'
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
            src: npc1Image,
            behaviorLoop:[
              {type:'stand',direction:'right',time:800},
              {type:'stand',direction:'up',time:800},
              {type:'stand',direction:'left',time:1200},
              {type:'stand',direction:'down',time:300},
            ]
          }),
          npc2: new Person({
            x: useGrid(3),
            y: useGrid(9),
            src: npc2Image,
            behaviorLoop:[
              {type:'walk',direction:'left'},
              {type:'stand',direction:'right',time:800},
              {type:'walk',direction:'up'},
              {type:'walk',direction:'right'},
              {type:'walk',direction:'down'},
            ]
          })
        },
        walls:{
          // 此处使用对象的动态语法 进行转换.最终转换为 "5,6":true
          [wallsLocation(7,6)]:true,
          [wallsLocation(8,6)]:true,
          [wallsLocation(7,7)]:true,
          [wallsLocation(8,7)]:true
        }
      }
}