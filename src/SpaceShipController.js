import { A, D, DOWN, LEFT, RIGHT, S, UP, W } from "./engine/Key";

export default class SpaceShipController {

    constructor(spaceship) {
        this.spaceShip = spaceship;
        this.acceleration = .030;
        this.angularVelocity = .030;
    }

    getLeftCommand() {
        return {
            key: LEFT, action: () => {
                if (this.spaceShip) this.spaceShip.accelerate(0, 0, -this.angularVelocity);
            }
        };
    };

    getRightCommand() {
        return {
            key: RIGHT, action: () => {
                if (this.spaceShip) this.spaceShip.accelerate(0, 0, this.angularVelocity);
            }
        }
    }

    getUpCommand() {
        return {
            key: UP, action: () => {
                if (this.spaceShip) {
                    this.spaceShip.accelerate(this.acceleration, this.acceleration);
                }
            }
        }
    }

    getDownCommand() {
        return {
            key: DOWN, action: () => {
                if (this.spaceShip) this.spaceShip.accelerate(-this.acceleration, -this.acceleration);
            }
        }
    }

    getSpaceCommand() {
        return { key: undefined, action: undefined };
    }

    getWCommand() {
        return {
            key: W, action: () => {
                if (this.spaceShip) {
                    this.spaceShip.accelerateStrafe(0, -this.acceleration);
                }
            }
        }
    }

    getSCommand() {
        return {
            key: S, action: () => {
                if (this.spaceShip) {
                    this.spaceShip.accelerateStrafe(0, this.acceleration);
                }
            }
        }
    }

    getACommand() {
        return {
            key: A, action: () => {
                if (this.spaceShip) {
                    this.spaceShip.accelerateStrafe(-this.acceleration, 0);
                }
            }
        }
    }

    getDCommand() {
        return {
            key: D, action: () => {
                if (this.spaceShip) {
                    this.spaceShip.accelerateStrafe(this.acceleration, 0);
                }
            }
        }
    }
}