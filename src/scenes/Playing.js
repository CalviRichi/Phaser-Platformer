import { Player } from "./gameobjects/player.js";

// will do most of the heavy lifting
// the scene will manage its objects, but the objects will handle their state
// i.e this scene will define object interactions, but those objects handle the effects of them

// map layers: ground, background, decoration, hazard
// moving platforms will be their own entity.

export class Playing extends Phaser.Scene {

    constructor() {
        super("Playing");
    }

    preload() {

    }
    create() {
        this.last_time = 0;

        // --------------- MAP SETUP --------------------------------

        this.map = this.add.tilemap("tiles");

        var tileset = this.map.addTilesetImage("landscape", "tilesheet"); // the first param must match what it says in Tiled

        // the code below WILL NOT WORK until there is a matching tilemap, which there is not currently
        var ground = this.map.createLayer("ground", tileset, 0, 0); // layer names must also match
        var background = this.map.createLayer("background", tileset, 0,0);
        var decoration = this.map.createLayer("decoration", tileset, 0,0);
        var hazards = this.map.createLayer("hazards", tileset, 0, 0); // x and y can be 0 here

        // backgroundlayer.setCullPadding(3,3) for big tiles in the background to not dissapear
        ground.setCollisionBetween(1,1767); // for something like the obstacles, this is just from 1 to however many tiles there are 
        
        // ------------------- MEMBER OBJECT SETUP ----------------------------

        this.player = new Player(this, 300, 300, "bee");
        
        this.world = {ground: ground, background: background, decoration: decoration, hazards: hazards};

        this.left = this.input.keyboard.addKey("A", false, true);
        this.right = this.input.keyboard.addKey("D", false, true);
        this.keyStates = {a: left, d: right, space: ""};
        // a convenient way to pass these values to other functions

        // ----------------- CAMERA SETUP --------------------------

        // this.cameras.main.centerOn(this.player.x, this.player.y); // follow player
        // this.cameras.main.centerOn(this.player.x) // just on x
        // Camera like Terraria ^^^

        this.cameras.main.startFollow(this.player, true); // with deadzone
        this.cameras.main.setDeadzone(400,200);
        // Camera like Mario ^^^

        // -------------- PHYSICS SETUP --------------------------- 

        // this.physics.add.collider(player, layer, () => {
        //    } ); like in the shooter

        this.physics.add.collider(ground, this.player); // default callback

        // this.platform = this.physics.add.staticGroup();
        // this.platform.create(400,500,sprite);
        // this.physics.add.collider(player, platform)
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;
        // ALL SCENE LOGIC LIVES HERE
        
    }
}

