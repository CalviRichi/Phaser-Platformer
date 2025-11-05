export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image("tilesheet", "assets/tilesheet.png");
        this.load.tilemapTiledJSON("tiles", "assets/tilemap2.tmj");

    }

    create() {
        this.last_time = 0;

        this.map = this.add.tilemap("tiles");
        var tileset = this.map.addTilesetImage("landscape", "tilesheet"); // the first param must match what it says in Tiled
        this.map.createLayer("Geometry Layer", tileset, 0, 0); // layer names must also match


        var layer = this.map.createLayer("obstacles", tileset, 1, 1767); // idk what x and y are yet
        // background
        // decorations
        // paths
        layer.setCollisionBetween(1,1767); // for something like the obstacles, this is just from 1 to however many tiles there are 
        
        this.player = this.add.sprite();
        
        this.physics.add.collider(layer, this.player);

        this.cameras.main.centerOn(this.player.x, this.player.y); // follow player
        this.cameras.main.centerOn(this.player.x) // just on x
        this.cameras.main.startFollow(this.player, true); // with deadzone
        this.cameras.main.setDeadzone(400,200);
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;
        
    }
    
}
