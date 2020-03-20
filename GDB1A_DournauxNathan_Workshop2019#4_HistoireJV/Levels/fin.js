class fin extends Phaser.Scene {
    constructor() {
        super("fin");
    }

    init() {

	}

	preload() {
		this.load.image('fin','assets/finp.png');
		this.load.image('5','assets/5.png');
		this.load.image('BLACK','assets/BLACK.png');
		this.load.image('credit','assets/credit.png');
	}

	create() {
		this.add.image(0,0,'BLACK').setOrigin(0,0);
		this.manette = this.add.image(700,450,'5').setScale(1.5);

		this.player = this.physics.add.sprite(400,450,'fin').setScale(0.75);

		this.text1 = this.add.text(350, 150, 'Vous avez réussi !', { fontSize: '32px', fill: '#fff' });
		this.text1 = this.add.text(280, 230, 'Vous pouvez rentrer chez vous', { fontSize: '26px', fill: '#fff' });

		this.credit = this.add.image(512,384,'credit');
		this.credit.visible = false;
		
		this.timedEvent3 = this.time.addEvent({ delay: 8000, callback: credit, callbackScope: this, loop: true });

		function credit()
		{
			this.credit.visible = true;
		}
		
	}

	update() {
		
		
	}
}