
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

        scene.add.existing(this);  
        scene.physics.add.existing(this); 
        scene.player.body.setCollideWorldBounds(true);
        


        this.hp;
        this.x = x; this.y = y;

        // locally manage movement by having flags in the player class

        this.jump = false;
        this.left = false;
        this.right = false;

        // currently no local variables
        
        /* this could be used for a character select still
        switch (mode) {
            case "ship_1": // easy
                this.hp = 100;
                this.speed = 500;
                this.damage = 5;
                this.bullet_speed = 1100;
                break;
            case "ship_2":
                this.hp = 75;
                this.speed = 450;
                this.damage = 4;
                this.bullet_speed = 1000;
                break;
            case "ship_3":
                this.hp = 50;
                this.speed = 400;
                this.damage = 3;
                this.bullet_speed = 900;
                break;
            default:
                this.hp = 100;
                this.speed = 500;
                this.damage = 5;
                this.bullet_speed = 1100;
                break;
        }
        */

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let dt = delta/1000;

        //this.body.setVelocityX and Y
        // this.body.touching.down etc...
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
}