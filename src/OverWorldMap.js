import { useGrid } from "./share/utils";

export class OverworldMap {
    constructor(config) {
      this.gameObj = config.gameObj;
  
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
  }
