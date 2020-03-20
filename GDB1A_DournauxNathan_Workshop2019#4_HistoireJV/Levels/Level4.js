class Level4 extends Phaser.Scene {
    constructor() {
        super("VR");
    }

    init() {
	   
	}

	preload() {
		this.load.image('vrSky','assets/sky.png');	
		this.load.image('star','assets/star.png');

		this.load.image('sol','assets/platform.png');
		this.load.image('lad','assets/ladder.png');
		this.load.image('tuyau','assets/tuyau.png');
		this.load.image('brick','assets/brique.png');
		this.load.image('cube','assets/cube.png');
		this.load.image('box','assets/hBox.png');
		this.load.image('box','assets/hBox.png');

		this.load.image('ennemi', 'assets/ennemi.png');

		this.load.image('vrBoy','assets/vrperso.png');

		this.load.image('bullet', 'assets/bullet.png');

		this.load.image('3vie', 'assets/3vie.png');
		this.load.image('2vie', 'assets/2vie.png');
		this.load.image('1vie', 'assets/1vie.png');

		this.load.image('noir', 'assets/noir.png');
		this.load.image('4', 'assets/4.png');

		this.load.image('filter', 'assets/binocular.png');
		this.load.image('tuto4','assets/tuto4.png');
		this.load.image('BLACK','assets/BLACK.png')
	}

	create() {
		/*Fond du jeu*/
			this.add.image(400,300,'vrSky');
			this.add.image(1200,300,'vrSky')
			this.add.image(2000,300,'vrSky');
			this.add.image(2800,300,'vrSky');
			this.add.image(3600,300,'vrSky');
			this.add.image(4400,300,'vrSky');

		/*Echelle*/
			this.ladders = this.physics.add.staticGroup();
			this.ladders.create(568,200,'lad').setOrigin(0,0).refreshBody();
			this.ladders.create(2265,250,'lad').setScale(1,0.7).setOrigin(0,0).refreshBody();
			this.ladders.create(3968,250,'lad').setScale(1,0.7).setOrigin(0,0).refreshBody();
			
		/*Platformes*/
			this.platforms1 = this.physics.add.staticImage(0,450,'sol').setOrigin(0,0).refreshBody();
			this.platforms2 = this.physics.add.staticImage(600,200,'sol').setOrigin(0,0).refreshBody();

			this.platforms3 = this.physics.add.staticImage(1200,200,'sol').setScale(0.5,1).setOrigin(0,0).refreshBody();
			
			
			this.platforms4 = this.physics.add.staticImage(1700,620,'sol').setOrigin(0,0).refreshBody();
			this.platforms5 = this.physics.add.staticImage(2295,250,'sol').setOrigin(0,0).refreshBody();

			this.platforms6 = this.physics.add.staticImage(4000,250,'sol').setOrigin(0,0).refreshBody();
			this.clouds = this.physics.add.image(2800,250,'sol').setScale(0.5,1).setOrigin(0,0).setImmovable(true);
			this.clouds.body.setAllowGravity(false);

		/*Platformes qui disparaît*/
			this.fadePlatforms1 = this.physics.add.image(3050,575,'sol').setScale(0.5,1).setOrigin(0,0).setImmovable(true);
			this.fadePlatforms2 = this.physics.add.image(3350,575,'sol').setScale(0.5,1).setOrigin(0,0).setImmovable(true);
			this.fadePlatforms3 = this.physics.add.image(3650,575,'sol').setScale(0.5,1).setOrigin(0,0).setImmovable(true);
			this.fadePlatforms1.body.setAllowGravity(false);

		/*Platform mouvante*/
			this.movePlatformsY = this.physics.add.image(1400,200,'sol').setScale(0.5,1).setOrigin(0,0).setImmovable(true);
			this.movePlatformsY.body.setAllowGravity(false);


		/*Fragment*/
		this.fragment = this.physics.add.sprite(4200, 200, '4');
		/*Joueur*/
		this.cameras.main.setBounds(0, 0, 1200 * 3.75, 768);
	    this.physics.world.setBounds(0, 0, 1200 * 3.75, 768);

		this.player = this.physics.add.sprite(100,360,'vrBoy');
		this.player.setCollideWorldBounds(true);
		this.player.setGravityY(300);

		this.cameras.main.startFollow(this.player , true, 0.05, 0.05);

			//Animation
		/*
		this.anims.create({
			key:'idle',
			frames: this.anims.generateFrameNumbers('perso', {rupeet: 0, end: 3}),
			frameRate: 8,
			repeat: -1
		});*/

		/*Creation des input directionnelles*/
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		this.keys = this.input.keyboard.addKeys('Z,Q,S,D'); 
		
		/*Colllectible*/
		this.stars = this.physics.add.group({
			key: 'noir',
			setScale: { x: 1.5, y: 1.5}
		});

		/*Texte*/
			
		
		/*Ennemies*/
		this.ennemi1 = this.physics.add.sprite(1800,580,'ennemi').setScale(1.5);
		this.ennemi2 = this.physics.add.sprite(2000,580,'ennemi').setScale(1.5);
		

		/*this.anims.create({
			key:'frog',
			frames: this.anims.generateFrameNumbers('frog', {rupeet: 0, end: 3}),
			frameRate: 6,
			repeat: -1
		});*/

		/*Colliders*/
		this.physics.add.collider(this.player,this.ladders, onLadder, null, this);
		this.physics.add.collider(this.player,this.platforms1);
		this.physics.add.collider(this.player,this.platforms2);
		this.physics.add.collider(this.player,this.platforms3);
		this.physics.add.collider(this.player,this.platforms4);
		this.physics.add.collider(this.player,this.platforms5);
		this.physics.add.collider(this.player,this.platforms6);

		this.physics.add.collider(this.player,this.clouds);
		this.physics.add.collider(this.player,this.fadePlatforms1);
		this.physics.add.collider(this.player,this.fadePlatforms2);
		this.physics.add.collider(this.player,this.fadePlatforms3);
		this.physics.add.collider(this.player,this.movePlatformsY, /*ridePlatforms, null, this*/);
		this.physics.add.overlap(this.player,this.fragment, fadeLevel, null, this);

			/*Ennemis*/
				this.physics.add.overlap(this.ennemi1, this.player, hitEnnemi, null, this);
				this.physics.add.overlap(this.ennemi2, this.player, hitEnnemi, null, this);

		/*Ensemble des fonctions*/
		function hitEnnemi(ennemi, player) {
			this.player.x = 100;
			this.player.y = 360;
		}
	
		function onLadder(player, lad) {	
			if(this.keys.Z.isDown)
			{
				this.player.setVelocityY(-200);
			}
			else if(this.keys.S.isDown)
			{
				this.player.setVelocityY(200);
			}
			else
			{
				this.player.setVelocityY	(0);
			} 
		}

		
		function fadeLevel(player, fragment) {
			this.cameras.main.fade(0xf0f, 4000);
			this.timedEvent = this.time.delayedCall(5000, changeLevel, [], this);
		}

		function changeLevel() {
			this.scene.start('fin');
		}

		this.ennemi1.setAlpha(0);
		this.ladders.setAlpha(0);
		this.fadePlatforms2.setAlpha(0);
		this.platforms2.setAlpha(0);
		this.platforms5.setAlpha(0);
		this.movePlatformsY.setAlpha(0);
	
		this.vEffect = this.add.image(0,0,'filter').setOrigin(0,0).setScrollFactor(0);
		this.vEffect.visible = false;

		this.BLACK = this.add.image(0,0,'BLACK').setOrigin(0,0);
		this.tuto = this.add.image(512,384,'tuto4');
		
		this.timedEvent3 = this.time.addEvent({ delay: 6000, callback: tuto, callbackScope: this, loop: true });

		function tuto()
		{
			this.tuto.visible = false
			this.BLACK.visible = false
		}
	}


	update() {
		/*Déplacement*/
			//Saut
			if (this.player.body.touching.down && this.keys.Z.isDown)
			{
				this.player.setVelocityY(-390);
			}

			//Droite et gauche
			if(this.keys.Q.isDown)
			{
				this.player.direction = 'left';
				this.player.setVelocityX(-200);
				this.player.setFlipX(true);

				if (this.cursors.shift.isDown && this.player.body.touching.down) {
					this.player.setVelocityX(-200*2);
				}
			}
			else if(this.keys.D.isDown)
			{
				this.player.direction = 'right';
				this.player.setVelocityX(200);
				this.player.setFlipX(false);

				if (this.cursors.shift.isDown  && this.player.body.touching.down) {
					this.player.direction = 'right';
					this.player.setVelocityX(200*2);
				}
			}
			else
			{
				this.player.setVelocityX(0);
			} 

		/*Casque*/
			
			if (Phaser.Input.Keyboard.JustDown(this.fire)) 
			{
				if (this.casque == 0 )
				{
					this.vEffect.visible = false;	
					this.ladders.setAlpha(0);
					this.ennemi1.setAlpha(0);
					this.ennemi2.setAlpha(1);
					this.fadePlatforms1.setAlpha(1);
					this.fadePlatforms3.setAlpha(1);
					this.fadePlatforms2.setAlpha(0);
					this.platforms2.setAlpha(0);
					this.platforms5.setAlpha(0);
					this.movePlatformsY.setAlpha(0);

					this.casque = 1;
				}
				else {
					this.vEffect.visible = true;
					this.ennemi1.setAlpha(1);
					this.ennemi2.setAlpha(0);
					this.fadePlatforms2.setAlpha(1);
					this.fadePlatforms1.setAlpha(0);
					this.fadePlatforms3.setAlpha(0);
					this.ladders.setAlpha(1);
					this.platforms2.setAlpha(1);
					this.platforms5.setAlpha(1);
					this.movePlatformsY.setAlpha(1);
					this.casque = 0;
				}
			}

		//Ennemi
			if(this.ennemi1.y >= 580)
				{
					this.tweens.add({
				        targets: this.ennemi1,
				        y: 450,
				        duration: 1000,
				        ease: 'Linear'
					});
					
					this.ennemi1.setFlipX(false);
				}

				if(this.ennemi1.y <= 450)
				{
					this.tweens.add({
				        targets: this.ennemi1,
				        y: 580,	
				        duration: 1000,
				        ease: 'Linear'   
					});
					
					this.ennemi1.setFlipX(true);
				}

			if(this.ennemi2.y >= 580)
			{
				this.tweens.add({
			        targets: this.ennemi2,
			        y: 450,
			        duration: 1000,
			        ease: 'Linear'
				});
				
				this.ennemi2.setFlipX(false);
			}

			if(this.ennemi2.y <= 450)
			{
				this.tweens.add({
			        targets: this.ennemi2,
			        y: 580,	
			        duration: 1000,
			        ease: 'Linear'   
				});
				
				this.ennemi2.setFlipX(true);
			}

			//platformes
			if(this.movePlatformsY.y >= 620)
			{
				this.tweens.add({
			        targets: this.movePlatformsY,
			        y: 200,
			        duration: 2000,
			        ease: 'Linear'
				});
			}

			if(this.movePlatformsY.y <= 200)
			{
				this.tweens.add({
			        targets: this.movePlatformsY,
			        y: 620,
			        duration: 2000,
			        ease: 'Linear'

				});
			}

			if (this.player.x >= 1250) 
			{
				this.waypoint = 1;
			}
			if (this.player.x >= 2800) 
			{
				this.waypoint = 2;
			}

			if (this.player.y == 718 && this.waypoint == 2) 
			{
				this.player.x = 2850;
				this.player.y = 120;
			}
			else if (this.player.y == 718 && this.waypoint == 1) 
			{
				this.player.x = 1250;
				this.player.y = 120;
			}
			else if (this.player.y == 718) 
			{
				this.player.x = 100;
				this.player.y = 350;
			}




	}
}