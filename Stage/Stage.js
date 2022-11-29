/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.gravity = -1.5;
    this.vars.falling = 0;
    this.vars.jumpForce = 12;
    this.vars.acceleration = 1.5;
    this.vars.resistance = 0.8;
    this.vars.scene = 1;
    this.vars.touchedOrb = 0;
    this.vars.rainbow = 1;
  }
}
