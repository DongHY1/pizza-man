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
    init() {
        return new Promise((resolve) => {
            this[this.event.type](resolve)
        })
    }
}