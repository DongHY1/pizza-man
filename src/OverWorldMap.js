import { useGrid,nextPosition} from "./share/utils";
export class OverworldMap {
    constructor(config) {
      this.gameObj = config.gameObj;
      // 墙壁坐标
      this.walls = config.walls || {}
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
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
      Object.values(this.gameObj).forEach(object => {
        object.mount(this)
      })
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
  }
