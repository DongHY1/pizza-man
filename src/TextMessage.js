import './styles/TextMessage.css'
import {KeyPressListener} from './KeyPressListener'
import {RevealingText} from './RevealingText'
export class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }
    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")
        this.element.innerHTML = (`
        <p class="TextMessage_p"></p>
        <button class="TextMessage_Button">Next</button>
        `)
        this.revealingText = new RevealingText({
            element:this.element.querySelector(".TextMessage_p"),
            text:this.text

        })
        this.element.querySelector("button").addEventListener("click",()=>{
            // 关闭
            this.done()

        })
        this.actionListener = new KeyPressListener("Space",()=>{
            this.done()
        })
    }
    done(){
        if(this.revealingText.isDone){
            this.element.remove()
            this.actionListener.unbind()
            this.onComplete()
        }else{
            this.revealingText.immediatelyDone()
        }

    }
    init(contianer) {
        this.createElement()
        contianer.appendChild(this.element)
        this.revealingText.init()
    }
}