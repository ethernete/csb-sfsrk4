/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Scene1", "./Level/costumes/Scene1.svg", {
        x: 272.56469288253095,
        y: 181.6369855011848
      }),
      new Costume("Scene2", "./Level/costumes/Scene2.svg", {
        x: 328.69441500000005,
        y: 124.37886964930414
      }),
      new Costume("Scene3", "./Level/costumes/Scene3.svg", {
        x: 268.69442500000025,
        y: 180.88027909810185
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Scene" },
        this.whenIReceiveChangeScene
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Make Player Smaller" },
        this.whenIReceiveMakePlayerSmaller
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.moveBehind();
  }

  *whenIReceiveChangeScene() {
    this.costume = "" + "Scene" + this.stage.vars.scene;
  }

  *whenIReceiveMakePlayerSmaller() {
    while (true) {
      if (this.stage.vars.rainbow == 1) {
        this.effects.color += 2;
      } else {
        this.effects.clear();
      }
      yield;
    }
  }
}
