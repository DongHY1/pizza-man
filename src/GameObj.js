import { Sprite } from "./Sprite"
export class GameObj{
    constructor(config){
        this.IsMount = false
        this.x = config.x||0
        this.y = config.y||0
        this.direction = config.direction || 'up'
        this.sprite = new Sprite({
            gameObj:this,
            src:config.src,
        })
    }
    mount(map){
        console.log("墙壁坐标添加!")
        this.IsMount = true
        map.addWall(this.x,this.y)
    }
    update(){
        
    }
}