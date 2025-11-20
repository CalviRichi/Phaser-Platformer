import { Player } from "./gameobjects/player.js";

// HANDLES THE END OF THE GAME (nothing thus far)

export class End extends Phaser.Scene {
    constructor() {
        super("End");
    }

    preload() {

    }
    create() {
        this.add.text(640, 200, "THANKS FOR PLAYING!", {
            fontSize: '64px',
            fill: '#FFF',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(640, 300, `FINAL SCORE: ${this.registry.get('finalScore') || 0}`, {
            fontSize: '48px',
            fill: '#FFF',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(640, 400, "PRESS SPACE TO RESTART", {
            fontSize: '32px',
            fill: '#FFF',
            align: 'center'
        }).setOrigin(0.5);

        this.space = this.input.keyboard.addKey("SPACE", false, true);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.stop("End");
            this.scene.start("Start");
        }
    }
}