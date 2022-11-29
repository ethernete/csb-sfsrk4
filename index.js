import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Level from "./Level/Level.js";
import Orb from "./Orb/Orb.js";
import ComingSoon from "./ComingSoon/ComingSoon.js";
import Spikes from "./Spikes/Spikes.js";
import Orb2 from "./Orb2/Orb2.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: -150,
    y: -34,
    direction: 0,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Level: new Level({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Orb: new Orb({
    x: -118.99999014536601,
    y: 138.9999905904142,
    direction: 90,
    costumeNumber: 1,
    size: 90,
    visible: true,
    layerOrder: 4
  }),
  ComingSoon: new ComingSoon({
    x: 179.99999084472714,
    y: 76.9999958462189,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Spikes: new Spikes({
    x: 97,
    y: 68,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  }),
  Orb2: new Orb2({
    x: 56.06665050543895,
    y: -23.54326920891628,
    direction: 90,
    costumeNumber: 1,
    size: 90,
    visible: false,
    layerOrder: 6
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
