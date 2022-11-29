/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Orb extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Orb/costumes/costume1.svg", {
        x: 16.166664999999995,
        y: 16
      })
    ];

    this.sounds = [new Sound("pop", "./Orb/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.size = 90;
    this.stage.vars.touchedOrb = 0;
    this.visible = false;
    while (true) {
      if (this.stage.vars.scene == 1) {
        if (this.stage.vars.touchedOrb == 0) {
          this.visible = true;
          if (this.touching(this.sprites["Player"].andClones())) {
            this.broadcast("Make Player Smaller");
            this.stage.vars.rainbow = 1;
            this.stage.vars.touchedOrb = 1;
            this.stage.vars.gravity = -1;
            this.stage.vars.acceleration = 2;
            this.stage.vars.jumpForce = 15;
            this.visible = false;
          }
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
