export class DirectionInput{
    constructor(){
        this.directionsArray = [] 
        this.map = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
          }
    }
    get direction(){
        return this.directionsArray[0]
    }
    init(){
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.directionsArray.indexOf(dir) === -1) {
              this.directionsArray.unshift(dir);
            }
            console.log(this.directionsArray)
          });
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.directionsArray.indexOf(dir);
            if (index!==-1) {
              this.directionsArray.splice(index, 1);
            }
            console.log(this.directionsArray)
          })
    }
}