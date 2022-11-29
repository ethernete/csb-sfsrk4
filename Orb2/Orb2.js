/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Orb2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Orb2/costumes/costume1.svg", {
        x: 16.16665499999999,
        y: 16
      })
    ];

    this.sounds = [new Sound("pop", "./Orb2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.size = 90;
    this.visible = false;
    while (true) {
      if (this.stage.vars.scene == 3) {
        if (this.stage.vars.touchedOrb == 1) {
          this.visible = true;
          if (this.touching(this.sprites["Player"].andClones())) {
            this.broadcast("lol");
            this.broadcast("Reset and Begin Level");
            this.stage.vars.rainbow = 0;
            this.stage.vars.touchedOrb = 2;
            this.stage.vars.gravity = -1.8;
            this.stage.vars.acceleration = 1;
            this.stage.vars.jumpForce = 11;
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
