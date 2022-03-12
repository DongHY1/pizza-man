import { OverworldEvent } from "./OverWorldEvent";
import { useGrid,nextPosition} from "./share/utils";
export class OverworldMap {
    constructor(config) {
      this.overworld = null
      this.gameObj = config.gameObj;
      // 墙壁坐标
      this.walls = config.walls || {}
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;

      this.isCutScenePlaying = false
      this.cutsceneSpaces = config.cutsceneSpaces || {}
    }
  
    drawLowerImage(ctx,cameraPerson) {
      ctx.drawImage(this.lowerImage, useGrid(10.5)-cameraPerson.x, useGrid(6)-cameraPerson.y)
    }
  
    drawUpperImage(ctx,cameraPerson) {
      ctx.drawImage(this.upperImage, useGrid(10.5)-cameraPerson.x, useGrid(6)-cameraPerson.y)
    } 
    isSpace(currentX,currentY,position){
      const {nextX,nextY} = nextPosition(currentX,currentY,position)
      return this.walls[`${nextX},${nextY}`] || false
    }
    mountObj(){
      Object.keys(this.gameObj).forEach(key => {
        let object = this.gameObj[key]
        object.id = key
        object.mount(this)
      })
    }
    async startCutScene(events){
      this.isCutScenePlaying = true
      for(let i =0;i<events.length;i++){
        const eventHandler = new OverworldEvent({
          map:this,
          event:events[i]
        })
        await eventHandler.init()
      }
      this.isCutScenePlaying = false
      // 完成过场动画后 重置NPC行为
      Object.values(this.gameObj).forEach(object=>object.doBeahviorEvent(this))
    }
    addWall(x,y){
      this.walls[`${x},${y}`] = true
    }
    removeWall(x,y){
      delete this.walls[`${x},${y}`]
    }
    updateWall(x,y,direction){
      this.removeWall(x,y)
      const {nextX,nextY} = nextPosition(x,y,direction)
      this.addWall(nextX,nextY)
    }
    checkForActionCutScene(){
      const hero = this.gameObj["hero"]
      const nextPos = nextPosition(hero.x,hero.y,hero.direction)
      const match = Object.values(this.gameObj).find((obj)=>{
        return  `${obj.x},${obj.y}`=== `${nextPos.nextX},${nextPos.nextY}`
      })
      if(!this.isCutScenePlaying && match && match.talking.length){
        this.startCutScene(match.talking[0].events)
      }
    }
    checkForFootStepCutScene(){
      const hero = this.gameObj["hero"]
      const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]
      console.log(this.cutsceneSpaces)
      if(!this.isCutScenePlaying && match){
        this.startCutScene(match[0].events)
      }
    }
  }
