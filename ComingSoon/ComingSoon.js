/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ComingSoon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./ComingSoon/costumes/costume1.svg", {
        x: 62.87966017513921,
        y: 38.86458999999999
      })
    ];

    this.sounds = [new Sound("pop", "./ComingSoon/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      if (this.stage.vars.scene == 3) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
