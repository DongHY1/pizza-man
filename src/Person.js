import { GameObj } from "./GameObj";
export class Person extends GameObj{
    constructor(config){
        super(config)
        this.movingProgessRemain = 0;
        this.direction
        // 该角色是否为玩家
        this.isPlayer = config.isPlayer ||false
        this.directionUpdate = {
            "up":["y",-1],
            "down":["y",1],
            "left":["x",-1],
            "right":["x",1]
        }
    }
    update(state){
        this.updatePosition()
        this.updateSprite(state)
        if(this.isPlayer && this.movingProgessRemain===0 && state.arrow){
            this.direction = state.arrow
            this.movingProgessRemain = 16
        }
    }
    // 更新人物位置
    updatePosition(){
        if(this.movingProgessRemain>0){
            const [property,change] = this.directionUpdate[this.direction]
            this[property] +=change
            this.movingProgessRemain -=1
        }
    }
    // 更新人物Sprite图中所处方向
    updateSprite(state){
        if(this.isPlayer && this.movingProgessRemain===0 && !state.arrow){
            this.sprite.setAnimation("idle-"+this.direction)
        }
        if(this.movingProgessRemain>0){
            this.sprite.setAnimation("walk-"+this.direction)
        }

    }

}