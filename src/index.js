import pug from './main.pug';
import style from './style.styl';

document.body.innerHTML = pug();

import Controller from './controller/Controller.js';

let controller = new Controller();

controller.setUpGame();
