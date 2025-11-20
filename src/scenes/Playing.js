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
        this.score = 0;

        // --------------- MAP SETUP --------------------------------

        this.map = this.add.tilemap("tiles_1");
        var tileset = this.map.addTilesetImage("platformer", "tilesheet_1");

        let left = this.input.keyboard.addKey("A", false, true);
        let right = this.input.keyboard.addKey("D", false, true);
        let jump = this.input.keyboard.addKey("SPACE", false, true);
        let attack = this.input.keyboard.addKey("COMMA", false, true);
        let gravityFlip = this.input.keyboard.addKey("S", false, true);
        this.keyStates = {a: left, d: right, space: jump, comma: attack, s: gravityFlip};

        var ground, decoration, hazards, collectibles, platforms;
  
        this.startX = 200;
        this.startY = 500;

        ground = this.map.createLayer("ground", tileset, 0, 0);
        decoration = this.map.createLayer("decoration", tileset, 0,0);
        hazards = this.map.createLayer("danger", tileset, 0, 0);
        collectibles = this.map.createLayer("collectibles", tileset, 0, 0);
        platforms = this.map.createLayer("platforms", tileset, 0,0);
        
      

        ground.setCollisionBetween(0,1000);

        platforms.setCollisionByExclusion([-1]);
        hazards.setCollisionByExclusion([-1]);

        this.tweens.add({
            targets: platforms,
            x: '+=400',
            duration: 5000,
            yoyo: true,
            repeat: -1
        });

        this.prevPlatformX = platforms.x;
        this.world = {ground: ground, decoration: decoration, hazards: hazards, collectibles: collectibles, platforms: platforms};
            
        this.player = new Player(this, this.startX, this.startY, "bee");
       
        this.coinSound = this.sound.add("coinSound", { volume: 0.5 });
        
        this.gravityParticles = this.add.particles(0, 0, "bee", {
            speed: { min: 50, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.1, end: 0 },
            lifespan: 500,
            quantity: 10,
            emitting: false
        });
        
        this.moveParticles = this.add.particles(0, 0, "bee", {
            speed: { min: 20, max: 40 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.05, end: 0 },
            lifespan: 300,
            frequency: 50,
            quantity: 1,
            follow: this.player
        });
        
        // ----------------- CAMERA SETUP --------------------------

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setZoom(1.5);
        // Camera like Mario ^^^

        // -------------- PHYSICS SETUP --------------------------- 
        
        this.levelCompleting = false;
        
        this.physics.add.collider(this.player, ground, (player, tile) => {
            if ((tile.index === 111 || tile.index === 112 || tile.index === 113 || tile.index === 131) && !this.levelCompleting) {
                console.log("Goal tile touched! Index:", tile.index);
                this.levelCompleting = true;
                this.nextLevel();
            }
        });

        this.physics.add.collider(this.player, platforms);

        this.physics.add.collider(this.player, hazards, (pl, hz) => {
            this.levelReset();
            this.score -= 10;
            if (this.score <= 0) {
                this.score = 0;
            }
        })
        
        if (this.world.collectibles) {
            this.physics.add.overlap(this.player, this.world.collectibles, (player, tile) => {
                if (tile.index === 152) {
                    this.score++;
                    console.log("Score:", this.score);
                    this.coinSound.play();
                    this.world.collectibles.removeTileAt(tile.x, tile.y);
                }
                if (tile.index === 68) {
                    this.player.body.setMaxVelocity(500, 500);
                    this.player.body.setDragX(2000);
                    console.log("New max velocity: 500");
                    this.world.collectibles.removeTileAt(tile.x, tile.y);
                }
            });
        }

      
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        // ALL SCENE LOGIC LIVES HERE

        // update keyboard
        this.player.update(this.keyStates);

        if (this.player.y > 1000 || this.player.y < 0 || this.player.x < 0) {
            this.levelReset();
        }
        
    }

    nextLevel() {
        this.scene.stop("Playing");
        this.scene.start("LevelTwo", {score :this.score});
    }

    levelReset() {
            this.player.x = this.startX;
            this.player.y = this.startY;
            this.player.body.setVelocity(0, 0);
            this.player.gravityFlipped = false;
            this.player.body.setGravityY(0);
            this.player.setFlipY(false);
    }

    

}