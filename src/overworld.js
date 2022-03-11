import { OverworldMap } from './OverWorldMap.js'
import { DirectionInput } from './DirectionInput.js'
import { Map } from './share/Map.js'
export class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }
  startGameLoop() {
    const step = () => {
      const cameraPerson = this.map.gameObj.hero
      //清除角色移动留下来的拖尾
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.map.drawLowerImage(this.ctx, cameraPerson);
      Object.values(this.map.gameObj).sort((a,b)=>{return a.y-b.y}).forEach(object => {
        // 更新角色实时位置 
        object.update({
          arrow: this.directionInput.direction,
          map:this.map
        })
        // 绘制角色位置
        object.sprite.draw(this.ctx, cameraPerson);
      })
      this.map.drawUpperImage(this.ctx, cameraPerson);
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  init() {
    // 初始化地图
    this.map = new OverworldMap(Map.DemoRoom);
    // 加载人物
    this.map.mountObj()
    // 控制人物移动
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();

    this.map.startCutScene([
      {who:"hero",type:"walk",direction:"down"},
      {who:"npc1",type:"walk",direction:"left"},
      {who:"npc1",type:"walk",direction:"left"},
      {who:"npc1",type:"walk",direction:"up"},
      {who:"npc2",type:"stand",direction:"down",time:100},
    ])
  }
}
