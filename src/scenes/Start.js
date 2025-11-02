export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        

    }

    create() {
        this.last_time = 0;
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;
        
    }
    
}
