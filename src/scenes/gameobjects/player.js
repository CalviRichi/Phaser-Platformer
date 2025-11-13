
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
        scene.add.existing(this);  
        scene.physics.add.existing(this); 
        scene.player.body.setCollideWorldBounds(true);

        // define local attributes
        this.hp;
        this.x = x; this.y = y;

        // locally manage movement by having flags in the player class

       // this.jump = false;
       // this.left = false;
       // this.right = false;

        this.keys = scene.keyStates;

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let dt = delta/1000;

        //this.body.setVelocityX and Y
        // this.body.touching.down etc...

        //  DO COYOTE TIME CHECK
        // use coyote time variable for jumps

        this.keys = scene.keyStates;
        if (Phaser.Input.Keyboard.JustDown(keyStates.space) && this.body.touching.down) {
            this.setVelocityY(-500);
        }
        if (Phaser.Input.Keyboard.JustDown(keyStates.comma)) {
// NULL
        }

        if (keyStates.a) {
            this.setAccelerationX(-600);
            this.setFlipX(true);
        }
        else if (keyStates.d) {
            this.setAccelerationX(600);
            this.setFlipX(false); // might need to change depending on the sprite we use
        }
        else {
            this.setAccelerationX(0);
            this.setDragX(800);
        }

        if (this.left) {
            this.x -= 10;
        }
        else if (this.right) {
            this.x += 10;
        }
        else {
            this.y -= 30;
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