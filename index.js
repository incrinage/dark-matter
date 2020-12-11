import Entity from './src/entity/Entity.js';
import EntityTest from './src/test/EntityTest.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/engine/KeyListener.js';
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from './src/Key.js';
import SpaceShip from './src/entity/spaceship/SpaceShip.js';
import Weapon from './src/entity/spaceship/Weapon.js';


export const canvas = new Canvas(1000, 1000);

function DarkMatter() {
console.log(canvas)
    const ctx = canvas.getContext();
    const spaceShipMass = 5;
    console.log('ahhsfafafa')
    this.entityTest = new EntityTest(
        new SpaceShip({
            mass: spaceShipMass,
            health: spaceShipMass,
            healthThreshold: 0,
            pos: { x: 100, y: 100 },
            weapon: new Weapon()
        }),
        new KeyListener([LEFT, RIGHT, UP, SPACE_BAR, DOWN]),
        canvas
    );

    this.dt = 0;
    this.update = (now) => {
        canvas.clear();
        console.log(now);
        if(now - this.dt > 16){
            
            this.dt = now;
            this.entityTest.update(now);
        }
      
        this.entityTest.render(ctx);

        requestAnimationFrame(this.update);
    }

    requestAnimationFrame(this.update)
}


new DarkMatter();

