export class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 

        this.setScale(0.2, 0.2);

        Object.defineProperty(this, 'MAX_VELOCITY', {
              value: 10,
              writable: false,
              configurable: false
        });

        this.scene = scene;
        this.scene.add.existing(this);  
        this.scene.physics.add.existing(this); 

        this.body.setBounce(0.1);
        this.body.setMaxVelocity(300, 500);
        this.body.setDragX(1200);

        this.hp;
        this.x = x; this.y = y;
        this.keys = scene.keyStates;
        this.gravityFlipped = false;

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let dt = delta/1000;
        
        if (Phaser.Input.Keyboard.JustDown(this.keys.s)) {
            if ((!this.gravityFlipped && this.body.blocked.down) || (this.gravityFlipped && this.body.blocked.up)) {
                this.gravityFlipped = !this.gravityFlipped;
                if (this.gravityFlipped) {
                    this.body.setGravityY(-1200);
                    this.setFlipY(true);
                } else {
                    this.body.setGravityY(0);
                    this.setFlipY(false);
                }
                
                if (this.scene.gravityFlipSound) {
                    this.scene.gravityFlipSound.play();
                }
                if (this.scene.gravityParticles) {
                    this.scene.gravityParticles.emitParticleAt(this.x, this.y, 15);
                }
            }
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            if (!this.gravityFlipped && this.body.blocked.down) {
                this.body.setVelocityY(-350);
            } else if (this.gravityFlipped && this.body.blocked.up) {
                this.body.setVelocityY(350);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.comma)) {

        }
        if (this.keys.a.isDown) {
            this.body.setAccelerationX(-1200);
            this.setFlipX(false);
        }
        else if (this.keys.d.isDown) {
            this.body.setAccelerationX(1200);
            this.setFlipX(true);
        }
        else {
            this.body.setAccelerationX(0);
            this.body.setDragX(1200);
        }
        
    }
    update(keyStates) {

       
    }
}