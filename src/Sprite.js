import shadowImg from '../assets/images/characters/shadow.png'
import { useFrame, useGrid } from './share/utils.js'
export class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }
    this.shadow = new Image();
    this.useShadow = true
    if (this.useShadow) {
      this.shadow.src = shadowImg;
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [[1, 0], [0, 0], [3, 0], [2, 0]],
      "walk-right": [[1, 1], [0, 1], [3, 1], [2, 1]],
      "walk-up": [[1, 2], [0, 2], [3, 2], [2, 2]],
      "walk-left": [[1, 3], [0, 3], [3, 3], [2, 3]]
    }
    this.currentAnimation = "idle-up";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = config.animationFrameLimit || 16;
    // 切换到下一帧需要多长时间:从16->0，当=0时又恢复为16
    this.animationFrameProgress = this.animationFrameLimit
    //Reference the game object
    this.gameObj = config.gameObj;
  }
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }
  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return
    }
    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame++
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }
  draw(ctx, cameraPerson) {
    const x = this.gameObj.x - 8 + useGrid(10.5) - cameraPerson.x;
    const y = this.gameObj.y - 18 + useGrid(6) - cameraPerson.y;
    const [frameX, frameY] = this.frame;
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded && ctx.drawImage(this.image,
      useFrame(frameX), useFrame(frameY),
      32, 32,
      x, y,
      32, 32
    )
    this.updateAnimationProgress()
  }
}