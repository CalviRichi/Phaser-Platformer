export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image("platformfiles", "assets.platforms.png");
        this.load.tilemapTiledJSON("tiles", "assets/tilemap.tmj");

    }

    create() {
        this.last_time = 0;

        this.map = this.add.tilemap("tiles");
        var tileset = this.map.addTilesetImage("platformer", "platformtiles"); // the first param must match what it says in Tiled
        this.map.createLayer("Geometry Layer", tileset, 0, 0); // layer names must also match

        var layer = this.map.createLayer("obstacles", tileset, x, y); // idk what x and y are yet
        layer.setCollisionBetween(1,1767); // which tiles
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
