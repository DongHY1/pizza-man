import { Sprite } from "./Sprite"
import { OverworldEvent} from './OverWorldEvent'
export class GameObj{
    constructor(config){
        this.id = null
        this.IsMount = false
        this.x = config.x||0
        this.y = config.y||0
        this.direction = config.direction || 'up'
        this.sprite = new Sprite({
            gameObj:this,
            src:config.src,
        })
        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0
        this.talking = config.talking || []
    }
    mount(map){
        console.log("墙壁坐标添加!")
        this.IsMount = true
        map.addWall(this.x,this.y)
        setTimeout(()=>{
            this.doBeahviorEvent(map)
        },10)
    }
    update(){
        
    }
    async doBeahviorEvent(map){
        // 如果此时正在播放过场动画 或者 人物没有循环
        if(map.isCutScenePlaying || this.behaviorLoop.length===0 || this.isStanding){
            return
        }
        // 拿到此时人物事件
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id
        // 拿到执行的事件 并等待事件完成
        let eventHandler = new OverworldEvent({map,event:eventConfig})
        await eventHandler.init()

        this.behaviorLoopIndex+=1
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0
        }
        this.doBeahviorEvent(map)
    }
}