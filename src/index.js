import pug from './main.pug';
import style from './style.styl';

document.body.innerHTML = pug();

import Controller from './controller/controller.js';

let controller = new Controller();
