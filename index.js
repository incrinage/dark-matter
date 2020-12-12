import EntityTest from './src/test/EntityTest.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/engine/KeyListener.js';
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from './src/Key.js';
import SpaceShip from './src/entity/spaceship/SpaceShip.js';
import Weapon from './src/entity/spaceship/Weapon.js';


export const canvas = new Canvas(1000, 1000);
const audioContext = new AudioContext();
const audioElement = document.querySelector('audio');
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);
// select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', function () {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);
function DarkMatter() {
    const ctx = canvas.getContext();
    const spaceShipMass = 5;
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
        if (now - this.dt > 16) {

            this.dt = now;
            this.entityTest.update(now);
        }

        this.entityTest.render(ctx);

        requestAnimationFrame(this.update);
    }

    requestAnimationFrame(this.update)
}


new DarkMatter();

