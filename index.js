import Entity from './src/Entity.js';
import EntityTest from './src/test/EntityTest.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/KeyListener.js';
import { LEFT, RIGHT, SPACE_BAR, UP } from './src/Key.js';
import SpaceShip from './src/SpaceShip.js';
import Weapon from './src/Weapon.js';
import Ammo from './src/Ammo.js';
import Bullet from './src/Bullet.js';


function init() {
    let canvas = new Canvas(500, 500);

    const ctx = canvas.getContext();
    this.entityTest = new EntityTest(new SpaceShip({ x: 100, y: 100}),
     new KeyListener([LEFT, RIGHT, UP, SPACE_BAR]), new Weapon(new Ammo([new Bullet(5)])));

    this.update = (t) => {
        canvas.clear();
        this.entityTest.update(t);
        this.entityTest.render(ctx);

        requestAnimationFrame(this.update);
    }
    
    requestAnimationFrame(this.update)
}


new init();

