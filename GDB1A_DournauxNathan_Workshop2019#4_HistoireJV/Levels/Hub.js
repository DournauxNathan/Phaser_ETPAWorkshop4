class Hub extends Phaser.Scene {
    constructor() {
        super("hub");
    }

    init() {

	}

	preload() {
		this.load.image('perso','assets/level3/c/perso32.png');
		this.load.image('tableau','assets/cube.png');
		this.load.image('background','assets/hub.png');	
		this.load.image('pil','assets/pillar.png');
	}

	create() {
		this.add.image(0,0,'background').setOrigin(0,0);
		this.add.image(1024,0,'background').setOrigin(0,0);
		this.add.image(2048,0,'background').setOrigin(0,0);

		this.cameras.main.setBounds(0, 0, 1024*2.25, 768);
	    this.physics.world.setBounds(0, 0, 1024*2.25, 768);


		this.level1 = this.add.image(560,460,'tableau');
		this.level2 = this.add.image(1070,460,'tableau');
		this.level3 = this.add.image(1580,460,'tableau');
		this.level5 = this.add.image(2100,460,'tableau');

		this.player = this.physics.add.sprite(100,510,'perso');

		this.title = this.add.text(460, 100, 'A Journey     through Video	    Games History', { fontSize: '48px', fill: '#fff' });
		this.pillar = this.add.image(300,460,'pil');
		this.pillar = this.add.image(800,460,'pil');
		this.pillar = this.add.image(1330,460,'pil');
		this.pillar = this.add.image(1800,460,'pil');
		this.pillar = this.add.image(2300,460,'pil');	

		this.cameras.main.startFollow(this.player , true, 0.05, 0.05);
		this.player.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();

		this.keys = this.input.keyboard.addKeys('Z,Q,S,D'); 

		

		this.text1 = this.add.text(425, 320, 'La guerre de l espace', { fontSize: '20px', fill: '#fff' });
		this.text1.visible = false;

		this.text2 = this.add.text(1025, 320, 'Froggy', { fontSize: '20px', fill: '#fff' });
		this.text2.visible = false;

		this.text3 = this.add.text(1530, 320, 'Jump Man', { fontSize: '20px', fill: '#fff' });
		this.text3.visible = false;

		this.text4 = this.add.text(2000	, 320, 'Voir ou ne pas voir', { fontSize: '20px', fill: '#fff' });
		this.text4.visible = false;


	}

	update() {
		if (this.player.x > 550 && this.player.x < 570) 
		{
			this.text1.visible = true;
			this.text2.visible = false;

			this.space = this.add.text(460, 400, 'Appyuer sur Espace', { fontSize: '20px', fill: '#fff' });

			if(this.cursors.space.isDown)
			{
				this.scene.start('SpaceWar')
			}
		}

		if (this.player.x > 1070 && this.player.x < 1090) 
		{
			this.text1.visible = false;
			this.text2.visible = true;
			this.text3.visible = false;

			this.space = this.add.text(960, 400, 'Appyuer sur Espace', { fontSize: '20px', fill: '#fff' });

			if(this.cursors.space.isDown)
			{
				this.scene.start('Frogger');
			}
		}

		if (this.player.x > 1590 && this.player.x < 1610) 
		{
			this.text2.visible = false;
			this.text3.visible = true;
			this.text4.visible = false;

			this.space = this.add.text(1460, 400, 'Appyuer sur Espace', { fontSize: '20px', fill: '#fff' });

			if(this.cursors.space.isDown)
			{
				this.scene.start('Mario');
			}
		}

		if (this.player.x > 2110 && this.player.x < 2130	) 
		{
			this.text3.visible = false;
			this.text4.visible = true;

			this.space = this.add.text(2000, 400, 'Appyuer sur Espace', { fontSize: '20px', fill: '#fff' });

			if(this.cursors.space.isDown)
			{
				this.scene.start('VR');
			}
		}




		//Droite et gauche
			if(this.keys.Q.isDown)
			{
				this.player.direction = 'left';
				this.player.setVelocityX(-200);
				this.player.setFlipX(true);

				if (this.cursors.shift.isDown) {
					this.player.setVelocityX(-200*2);
				}
			}
			else if(this.keys.D.isDown)
			{
				this.player.direction = 'right';
				this.player.setVelocityX(200);
				this.player.setFlipX(false);

				if (this.cursors.shift.isDown) {
					this.player.direction = 'right';
					this.player.setVelocityX(200*2);
				}
			}
			else
			{
				this.player.setVelocityX(0);
			} 
		
	}
}