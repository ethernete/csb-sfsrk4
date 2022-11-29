/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Guy", "./Player/costumes/Guy.svg", {
        x: 15.989795000000044,
        y: 15.989794999999987
      })
    ];

    this.sounds = [new Sound("Meow", "./Player/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Tick - Player" },
        this.whenIReceiveTickPlayer
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Loop" },
        this.whenIReceiveGameLoop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Tick - Last" },
        this.whenIReceiveTickLast
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Make Player Smaller" },
        this.whenIReceiveMakePlayerSmaller
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset and Begin Level" },
        this.whenIReceiveResetAndBeginLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "lol" }, this.whenIReceiveLol)
    ];

    this.vars.speedY = 0;
    this.vars.speedX = 0;
    this.vars.lastValue = -34;
    this.vars.touching = 0;
    this.vars.temp = 0;
    this.vars.distance = 1;
  }

  *whenGreenFlagClicked() {
    this.size = 100;
    this.stage.vars.gravity = -1.5;
    this.stage.vars.jumpForce = 12;
    this.stage.vars.acceleration = 1.5;
    this.stage.vars.resistance = 0.8;
    yield* this.resetAndBeginLevel();
  }

  *moveInSteps(steps) {
    this.stage.vars.falling += 1;
    for (let i = 0; i < steps; i++) {
      this.vars.lastValue = this.x;
      this.x += this.vars.speedX / steps;
      this.warp(this.checkTouchingSolid)();
      if (this.vars.touching > 0) {
        this.x = this.vars.lastValue;
        this.vars.speedX = 0;
      }
      this.vars.lastValue = this.y;
      this.y += this.vars.speedY / steps;
      this.warp(this.checkTouchingSolid)();
      if (this.vars.touching > 0) {
        this.y = this.vars.lastValue;
        if (this.vars.speedY < 0) {
          this.stage.vars.falling = 0;
        }
        this.vars.speedY = 0;
      }
    }
  }

  *checkTouchingSolid() {
    if (this.touching(this.sprites["Level"].andClones())) {
      this.vars.touching = 1;
    } else {
      this.vars.touching = 0;
    }
  }

  *whenIReceiveTickPlayer() {
    yield* this.controlsUpAndDown();
    yield* this.controlsLeftAndRight();
    yield* this.moveInSteps(
      Math.abs(this.vars.speedX) + Math.abs(this.vars.speedY)
    );
  }

  *controlsUpAndDown() {
    if (this.keyPressed("up arrow") || this.keyPressed("space")) {
      if (this.stage.vars.falling < 3) {
        this.vars.speedY = this.stage.vars.jumpForce;
      }
    }
    this.vars.speedY += this.stage.vars.gravity;
  }

  *controlsLeftAndRight() {
    if (this.keyPressed("left arrow")) {
      this.vars.speedX += 0 - this.stage.vars.acceleration;
    }
    if (this.keyPressed("right arrow")) {
      this.vars.speedX += this.stage.vars.acceleration;
    }
    this.vars.speedX = this.vars.speedX * this.stage.vars.resistance;
  }

  *resetAndBeginLevel() {
    this.stage.vars.scene = 1;
    this.vars.speedX = 0;
    this.vars.speedY = 0;
    this.stage.vars.falling = 99;
    this.goto(-150, 70);
    this.broadcast("Change Scene");
    this.broadcast("Game Loop");
  }

  *whenIReceiveGameLoop() {
    while (true) {
      this.broadcast("Tick - Player");
      this.broadcast("Tick - Last");
      yield;
    }
  }

  *whenIReceiveTickLast() {
    if (this.x > 235) {
      yield* this.beginSceneHashGoToX(this.stage.vars.scene + 1, -235);
    }
    if (this.x < -235) {
      yield* this.beginSceneHashGoToX(this.stage.vars.scene + -1, 235);
    }
  }

  *beginSceneHashGoToX(scene2, x) {
    this.stage.vars.scene = scene2;
    this.x = x;
    this.broadcast("Change Scene");
    /* TODO: Implement stop other scripts in sprite */ null;
    yield* this.wait(0);
    yield* this.fixCollisionInDirection(0);
    this.broadcast("Game Loop");
    if (this.stage.vars.touchedOrb == 1) {
      this.broadcast("Make Player Smaller");
    }
  }

  *fixCollisionInDirection(dir) {
    this.vars.temp = this.direction;
    this.vars.distance = 1;
    this.direction = dir;
    for (let i = 0; i < 128; i++) {
      this.warp(this.checkTouchingSolid)();
      if (this.vars.touching < 1) {
        this.direction = this.vars.temp;
        return;
      }
      this.move(this.vars.distance);
      this.direction += 180;
      this.vars.distance += 1;
    }
  }

  *whenIReceiveMakePlayerSmaller() {
    this.size = 50;
    while (true) {
      if (this.stage.vars.rainbow == 1) {
        this.effects.color += 2;
      } else {
        this.effects.clear();
      }
      yield;
    }
  }

  *whenIReceiveResetAndBeginLevel() {
    this.stage.vars.scene = 1;
    this.vars.speedX = 0;
    this.vars.speedY = 0;
    this.stage.vars.falling = 99;
    this.goto(-150, 70);
    this.broadcast("Change Scene");
    this.broadcast("Game Loop");
  }

  *whenIReceiveLol() {
    this.size = 175;
  }
}
