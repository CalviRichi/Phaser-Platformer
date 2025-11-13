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
        this.load.image("tilesheet", "assets/tilemap_packed.png");
        this.load.image("bee", "assets/bee.png")
        this.load.tilemapTiledJSON("tiles", "assets/platformer.tmj");
    }
    create() {
        this.last_time = 0;

        // --------------- MAP SETUP --------------------------------

        this.map = this.add.tilemap("tiles");

        var tileset = this.map.addTilesetImage("platformer", "tilesheet"); // the first param must match what it says in Tiled

        // the code below WILL NOT WORK until there is a matching tilemap, which there is not currently
        var ground = this.map.createLayer("ground", tileset, 0, 0); // layer names must also match
       // var background = this.map.createLayer("background", tileset, 0,0);
        var decoration = this.map.createLayer("decoration", tileset, 0,0);
        var hazards = this.map.createLayer("danger", tileset, 0, 0); // x and y can be 0 here

        // backgroundlayer.setCullPadding(3,3) for big tiles in the background to not dissapear
        ground.setCollisionBetween(0,1000); // for something like the obstacles, this is just from 1 to however many tiles there are 
        // 50 * 100 * 18 = 90,0000
        // ------------------- MEMBER OBJECT SETUP ----------------------------
        // background : background
        this.world = {ground: ground, decoration: decoration, hazards: hazards};

        let left = this.input.keyboard.addKey("A", false, true);
        let right = this.input.keyboard.addKey("D", false, true);
        let jump = this.input.keyboard.addKey("SPACE", false, true);
        let attack = this.input.keyboard.addKey("COMMA", false, true);
        this.keyStates = {a: left, d: right, space: jump, comma: attack}; // space (and comma) will be defined in the update stage
        // a convenient way to pass these values to other functions

        this.player = new Player(this, 300, 300, "bee");
        // ----------------- CAMERA SETUP --------------------------

        // this.cameras.main.centerOn(this.player.x, this.player.y); // follow player
        // this.cameras.main.centerOn(this.player.x) // just on x
        // Camera like Terraria ^^^

        this.cameras.main.startFollow(this.player, true); // with deadzone
        this.cameras.main.setDeadzone(400,200);
        // Camera like Mario ^^^
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        // -------------- PHYSICS SETUP --------------------------- 

        // this.physics.add.collider(player, layer, () => {
        //    } ); like in the shooter
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.physics.add.collider(this.player, ground); // default callback

        // this.platform = this.physics.add.staticGroup();
        // this.platform.create(400,500,sprite);
        // this.physics.add.collider(player, platform)
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;
        // ALL SCENE LOGIC LIVES HERE

        // update keyboard
        this.player.update(this.keyStates);
        
        
    }
}

