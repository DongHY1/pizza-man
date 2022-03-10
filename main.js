import {Overworld} from './src/overworld'
import './style.css'
function init() {
  const overworld = new Overworld({
      element: document.querySelector(".game-container")
  });
  overworld.init();
}
init();