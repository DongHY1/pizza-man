import { GameObj } from "./GameObj";
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
            if (this.isPlayer && state.arrow) {
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
                return
            }
        }
        state.map.updateWall(this.x, this.y, this.direction)
        this.movingProgessRemain = 16
    }
    // 更新人物位置
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgessRemain -= 1
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