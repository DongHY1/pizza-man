import {TextMessage} from './TextMessage'
import {SceneTransition} from './SceneTransition'
import {oppositeDirection} from './share/utils'
import {Map} from './share/Map'
export class OverworldEvent {
    constructor({ map, event }) {
        this.map = map
        this.event = event
    }
    walk(resolve) {
        const who = this.map.gameObj[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: 'walk',
            direction: this.event.direction,
            // 当碰到主角后，角色的移动会停止。当主角离开后是否再次移动？
            tryAgain: true
        })
        // 当触发的事件完毕后,移除
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()
            }
        }
        // 当人物走完时，触发事件
        document.addEventListener("PersonWalkingComplete", completeHandler)
    }
    stand(resolve) {
        const who = this.map.gameObj[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: 'stand',
            direction: this.event.direction,
            time: this.event.time,
        })
        // 当触发的事件完毕后,移除
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandingComplete", completeHandler)
                resolve()
            }
        }
        // 当人物走完时，触发事件
        document.addEventListener("PersonStandingComplete", completeHandler)
    }
    textMessage(resolve){
        if(this.event.faceHero){
            const npc = this.map.gameObj[this.event.faceHero]
            npc.direction = oppositeDirection(this.map.gameObj["hero"].direction)
        }
        const message = new TextMessage({
            text:this.event.text,
            onComplete:()=>resolve()
        })
        message.init(document.querySelector(".game-container"))
    }
    changeMap(resolve){
        const sceneTransition = new SceneTransition()
        sceneTransition.init(document.querySelector(".game-container"),()=>{
            this.map.overworld.startMap(Map[this.event.map])
            resolve()
            sceneTransition.fadeOut()
        })

    }
    init() {
        return new Promise((resolve) => {
            this[this.event.type](resolve)
        })
    }
}