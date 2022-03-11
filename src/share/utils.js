export function useGrid(n){
    return n*16
}
export function useFrame(n){
    return n*32
}
export function wallsLocation(x,y){
    return `${useGrid(x)},${useGrid(y)}`
}
export function nextPosition (x,y,position){
    let nextX = x
    let nextY = y
    if(position==='left'){  
        nextX = nextX-16
    }else if (position==='right'){
        nextX = nextX+16
    }else if (position==='up'){
        nextY = nextY-16
    }else if(position==='down'){
        nextY = nextY+16
    }
    return {nextX,nextY}
}