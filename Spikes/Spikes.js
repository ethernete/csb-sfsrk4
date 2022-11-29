/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Spikes extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Spikes/costumes/costume1.svg", {
        x: 16.00000000000003,
        y: 17.00000000000003
      })
    ];

    this.sounds = [new Sound("pop", "./Spikes/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(97, 68);
    this.visible = false;
    while (true) {
      if (this.stage.vars.scene == 3) {
        this.visible = true;
        if (this.touching(this.sprites["Player"].andClones())) {
          this.broadcast("Reset and Begin Level");
        }
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
