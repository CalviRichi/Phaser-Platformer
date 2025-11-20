import { Player } from "./gameobjects/player.js";
// import more important stuff
// STARTUP AND PRELOADING FOR IMAGES AND STUFF

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        
        
        //this.load.tilemapLayer('map', "assets/platformer.tsx");
        // figure out what other assets we want
        this.load.image("bee", "assets/bee.png")
        this.load.audio("coinSound", "assets/sounds/coin.mp3");
        this.load.image("platformTexture", "assets/Tiles/tile_0047.png");

        this.load.image("tilesheet_2", "assets/Tilemap/tilemap.png");
        this.load.tilemapTiledJSON("tiles_2", "assets/thelevelfile.tmj");

        this.load.image("tilesheet_1", "assets/tilemap_packed.png");
        this.load.tilemapTiledJSON("tiles_1", "assets/platformer.tmj");

    }

    create() {
        this.title_text = this.add.text(640, 100, "WELCOME TO OUR PLATFORMER", 
            {   fontSize: '64px',
                fill: '#FFF', 
                align: "center" 
            });
        this.title_text.setOrigin(0.5, 0.5);

        this.other_text = this.add.text(640,300, "PRESS SPACE TO BEGIN!", {
            fontSize: "24px",
            fill: "#FFF",
            align: "center"
        });
        this.other_text.setOrigin(0.5,0.5);

        this.space = this.input.keyboard.addKey("SPACE", false, true);

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.stop("Start");
            this.scene.start("Playing");
        }
    }
    
}
