import { GameObj } from "./GameObj";
import {emitEvent} from "./share/utils"
export class Person extends GameObj {
    constructor(config) {
        super(config)
        this.movingProgessRemain = 0;
        this.direction
        // 该角色是否为玩家
        this.isPlayer = config.isPlayer || false
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }
    update(state) {
        if (this.movingProgessRemain > 0) {
            this.updatePosition()
        } else {
            if (!state.map.isCutScenePlaying &&this.isPlayer && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state)
        }
    }
    startBehavior(state, behavior) {
        this.direction = behavior.direction
        if (behavior.type === 'walk') {
            if (state.map.isSpace(this.x, this.y, this.direction)) {
                behavior.tryAgain && setTimeout(()=>{
                    this.startBehavior(state, behavior)
                },10)
                return
            }
            state.map.updateWall(this.x, this.y, this.direction)
            this.movingProgessRemain = 16
            this.updateSprite()
        }
        if(behavior.type === 'stand'){
            setTimeout(()=>{
                emitEvent("PersonStandingComplete",{whoId:this.id})
            },100)
        }
    }
    // 更新人物位置
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgessRemain -= 1
        if(this.movingProgessRemain===0){
            // 说明人物已经移动完毕，可以触发事件了
            // 设计模式：Single Pattern
            emitEvent("PersonWalkingComplete",{whoId:this.id})
        }
    }
    // 更新人物Sprite图中所处方向
    updateSprite() {
        if (this.movingProgessRemain > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
            return
        }
        this.sprite.setAnimation("idle-" + this.direction)
        
    }

}