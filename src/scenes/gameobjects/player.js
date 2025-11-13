// PLAYER.JS WRITTEN BY CALVIN RICHARDS
export class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, sprite) { // mode affects ship and stats
        super(scene, x, y, sprite); 

        this.setScale(0.2, 0.2);

        Object.defineProperty(this, 'MAX_VELOCITY', {
              value: 10, // pass it in
              writable: false, // Prevents reassignment of the property
              configurable: false // Prevents deletion or modification of the property's attributes
        });

        // Probably do more object define property for other things

        // define physics and scene attributes
        this.scene = scene;
        this.scene.add.existing(this);  
        this.scene.physics.add.existing(this); 

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.1);
        this.body.setMaxVelocity(300, 600); // used inside of setAcceleration
        this.body.setDragX(600); // also used inside of setAcceleration

        // define local attributes
        this.hp;
        this.x = x; this.y = y; // not directly used 
        this.keys = scene.keyStates;

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let dt = delta/1000;

        // DO COYOTE TIME CHECK
        // use coyote time variable for jumps
        
        //this.keys = this.scene.keyStates;
        if (Phaser.Input.Keyboard.JustDown(this.keys.space) && this.body.blocked.down) {
            console.log("space");
            this.body.setVelocityY(-500);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.comma)) {
            // NULL
        }
        if (this.keys.a.isDown) {
            this.body.setAccelerationX(-600);
            this.setFlipX(false);
        }
        else if (this.keys.d.isDown) {
            this.body.setAccelerationX(300);
            this.setFlipX(true); // might need to change depending on the sprite we use
        }
        else {
            this.body.setAccelerationX(0);
            this.body.setDragX(800);
        }

        // this.physics.overlap(player, item, item collect callback)
        
    }
    update(keyStates) {
        /*
        I think it makes more sense to just write my own update function, since there is no automated movement or anything
        Preupdate can be reserved for stuff relating to gravity
        */
       // keystates contains the values for a, d, space, and comma
       
    }
}