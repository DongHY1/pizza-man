import { Sprite } from "./Sprite"
export class GameObj{
    constructor(config){
        this.x = config.x||0
        this.y = config.y||0
        this.direction = config.direction || 'up'
        this.sprite = new Sprite({
            gameObj:this,
            src:config.src,
        })
    }
    update(){
        
    }
}