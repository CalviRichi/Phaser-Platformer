import { Player } from "./gameobjects/player.js";
// import more important stuff
// this will be moved to a playing class eventually

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image("tilesheet", "assets/tilesheet.png");
        this.load.image("bee", "assets/bee.png")
        this.load.tilemapTiledJSON("tiles", "assets/tilemap2.tmj");

    }

    create() {
        this.last_time = 0;

        this.map = this.add.tilemap("tiles");
        var tileset = this.map.addTilesetImage("landscape", "tilesheet"); // the first param must match what it says in Tiled
        this.map.createLayer("background", tileset, 32 * 15, 0); // layer names must also match
        this.map.createLayer("decoration", tileset, 0,0);
        this.map.createLayer("paths", tileset, 0,0);

        var layer = this.map.createLayer("obstacles", tileset, 0, 0); // the x and y here seem to be the map world location
        // background
        // decorations
        // paths

        // backgroundlayer.setCullPadding(3,3) for big tiles in the background to not dissapear
        layer.setCollisionBetween(1,1767); // for something like the obstacles, this is just from 1 to however many tiles there are 
        
        this.player = new Player(this, 300, 300, "bee");
        this.physics.add.collider(layer, this.player); // default

        // this.world = {obstacles: "", decorations: "", paths: "", background: ""};
        // could be this.map also

      //  this.cameras.main.centerOn(this.player.x, this.player.y); // follow player
      //  this.cameras.main.centerOn(this.player.x) // just on x
        this.cameras.main.startFollow(this.player, true); // with deadzone
        this.cameras.main.setDeadzone(400,200); // this works like original mario


        // this.physics.add.collider(player, layer, () => {
        //    } ); like in the shooter
       

        // this.platform = this.physics.add.staticGroup();
        // this.platform.create(400,500,sprite);
        // this.physics.add.collider(player, platform)
        // add keyboard inputs 
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;
        
    }
    
}
