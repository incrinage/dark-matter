import Entity from './src/Entity.js';
import EntityTest from './src/test/EntityTest.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/KeyListener.js';
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from './src/Key.js';
import SpaceShip from './src/SpaceShip.js';
import Weapon from './src/Weapon.js';
import Ammo from './src/Ammo.js';
import Bullet from './src/Bullet.js';

export const canvas = new Canvas(1000, 1000);

function init() {

    const ctx = canvas.getContext();
    this.entityTest = new EntityTest(
        new SpaceShip({ pos: { x: 100, y: 100 }, weapon: new Weapon(new Ammo([new Bullet({ damage: 5 })])) }),
        new KeyListener([LEFT, RIGHT, UP, SPACE_BAR, DOWN]),
    );

    this.update = (t) => {
        canvas.clear();
        this.entityTest.update(t);
        this.entityTest.render(ctx);

        requestAnimationFrame(this.update);
    }

    requestAnimationFrame(this.update)
}


new init();

