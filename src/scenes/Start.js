import { Player } from "./gameobjects/player.js";
// import more important stuff
// STARTUP AND PRELOADING FOR IMAGES AND STUFF

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        
        this.load.image("tilesheet", "assets/tilesheet.png");
        this.load.image("bee", "assets/bee.png")
        this.load.tilemapTiledJSON("tiles", "assets/tilemap2.tmj");

        // figure out what other assets we want

    }

    create() {

    }

    update() {
        
    }
    
}
