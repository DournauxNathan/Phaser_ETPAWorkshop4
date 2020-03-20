class Level3b extends Phaser.Scene {
    constructor() {
        super("MarioB");
    }

    init() {
	   
	}

	preload() {
		this.load.image('sky16','assets/sky.png');	
		this.load.image('star','assets/star.png');

		this.load.image('sol','assets/platform.png');
		this.load.image('tuyau','assets/tuyau.png');
		this.load.image('brique16','assets/level3/b/brique.png');
		this.load.image('cube','assets/level3/b/cube.png');
		this.load.image('box','assets/hBox.png');


		this.load.image('ennemi', 'assets/ennemi.png');

		this.load.image('perso16','assets/level3/b/perso16.png');

		this.load.image('bullet', 'assets/bullet.png');

		this.load.image('3vie16', 'assets/level3/b/3vie.png');
		this.load.image('2vie16', 'assets/level3/b/2vie.png');
		this.load.image('1vie16', 'assets/level3/b/1vie.png');
		this.load.image('noir', 'assets/noir.png');
	}

	create() {
		/*Creation des projectiles*/
		 this.Bullet = new Phaser.Class({

	        Extends: Phaser.GameObjects.Image,

	        initialize:

	        function Bullet (scene)
	        {
	            Phaser.GameObjects.Image.call(this, scene, -100, 0, 'bullet');

	            this.speed = Phaser.Math.GetSpeed(600, 1);
	        },

	        fire: function (x, y)
	        {
	            this.setPosition(x, y);

	            this.setActive(true);
	            this.setVisible(true);
	        },

	        update: function (time, delta)
	        {
	            this.x += this.speed * delta;

	            if (this.x > 820)
	            {
	                this.setActive(false);
	                this.setVisible(false);
	            }
	        } 
	     });

		    this.bullets = this.add.group({
		        classType: this.Bullet,
		        maxSize: 30,
		        runChildUpdate: true
		    });

		/*Fond du jeu*/
			this.add.image(400,300,'sky16');
			this.add.image(1200,300,'sky16')
			this.add.image(2000,300,'sky16');
			this.add.image(2800,300,'sky16');
			this.add.image(3600,300,'sky16');

		/*Portes*/
			this.porte = this.physics.add.staticGroup();
			this.porte.create(3350,700,'tuyau').setScale(2,3).refreshBody();
			this.hitBox = this.physics.add.staticGroup();
			this.hitBox.create(3350, 640,'box');

		/*Tuyaux*/

		/*Platformes*/
			this.platforms = this.physics.add.staticGroup();
			this.platforms.create(0,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(600,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(900,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(1200,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(1800,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(2100,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(2400,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(2700,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(3000,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(3000,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();
			this.platforms.create(3400,560,'sol').setScale(0.75,10).setOrigin(0,0).refreshBody();

			this.platforms.create(1100,200,'sol').setScale(0.75,1).setOrigin(0,0).refreshBody();
			this.platforms.create(1400,200,'sol').setScale(0.75,1).setOrigin(0,0).refreshBody();
			this.platforms.create(1700,200,'sol').setScale(0.75,1).setOrigin(0,0).refreshBody();
			this.platforms.create(2100,200,'sol').setScale(0.75,1).setOrigin(0,0).refreshBody();

		/*Briques*/
			this.bricks = this.physics.add.staticGroup();
			this.bricks.create(850,400,'brique16');
			this.bricks.create(800,400,'brique16');
			this.bricks.create(900,400,'brique16');
			this.bricks.create(950,400,'brique16');
			this.bricks.create(1000,400,'brique16');

			this.bricks.create(2550,400,'brique16');
			this.bricks.create(2600,400,'brique16');
			this.bricks.create(2650,400,'brique16');

			this.bricks.create(2950,400,'brique16');
			this.bricks.create(3050,400,'brique16');
			this.bricks.create(3150,400,'brique16');

		/*Cubes*/
			this.cubes = this.physics.add.staticGroup();
			this.cubes.create(2250,400,'cube');
			this.cubes.create(3050,200,'cube');

		/*Joueur*/
		this.cameras.main.setBounds(0, 0, 1200 * 3, 768);
	    this.physics.world.setBounds(0, 0, 1200 * 3, 768);

		this.player = this.physics.add.sprite(100,510,'perso16');
		this.player.setCollideWorldBounds(true);
		this.player.setGravityY(400);

		this.cameras.main.startFollow(this.player , true, 0.05, 0.05);

		this.nVies = 3;
		this.vie3 = this.add.image(10,10,'3vie16').setOrigin(0,0).setScrollFactor(0);
		this.vie2 = this.add.image(10,10,'2vie16').setOrigin(0,0).setScrollFactor(0);
		this.vie1 = this.add.image(10,10,'1vie16').setOrigin(0,0).setScrollFactor(0);

			//Projectiles
		this.groupeBullets = this.physics.add.group();
		this.physics.add.overlap(this.groupeBullets,this.ennemi, hit, null,this);
		this.physics.add.overlap(this.groupeBullets,this.platforms, deleteBullet, null,this);
		this.physics.add.overlap(this.groupeBullets,this.tuyaux, deleteBullet, null,this);
		this.physics.add.overlap(this.groupeBullets,this.porte, deleteBullet, null,this);
		this.physics.add.overlap(this.groupeBullets,this.cubes, deleteBullet, null,this);
		this.physics.add.overlap(this.groupeBullets,this.bircks, deleteBullet, null,this);
	        
		
			//Animation
		/*
		this.anims.create({
			key:'idle',
			frames: this.anims.generateFrameNumbers('perso16', {rupeet: 0, end: 3}),
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
			//Score
		this.score = 0;
		this.add.image(1000,30,'noir').setScrollFactor(0);
		this.scoreText = this.add.text(930, 20, '0 ', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
			//GameOver
		this.gameOverText = this.add.text(450, 100, 'GAME OVER', {fontSize: '32px', fill: '#000' }).setScrollFactor(0);
		this.gameOverText.visible = false;
		
		/*Ennemies*/
		this.ennemi1 = this.physics.add.sprite(1400,522,'ennemi').setScale(1.5);
		this.ennemi2 = this.physics.add.sprite(2950,522,'ennemi').setScale(1.5);
		

		/*this.anims.create({
			key:'frog',
			frames: this.anims.generateFrameNumbers('frog', {rupeet: 0, end: 3}),
			frameRate: 6,
			repeat: -1
		});*/

		/*Colliders*/
		this.physics.add.collider(this.player,this.platforms);
		this.physics.add.collider(this.player,this.porte);
		this.physics.add.collider(this.player,this.bricks, destroyBricks, null, this);
		this.physics.add.collider(this.player,this.cubes, createStar, null, this);

		this.physics.add.collider(this.player,this.tuyaux);
		this.physics.add.collider(this.player,this.hitBox, fadeLevel, null, this);
			/*Ennemis*/
				this.physics.add.collider(this.ennemi1,this.platforms);
				this.physics.add.collider(this.ennemi1, this.player, hitEnnemi, null, this);
				this.physics.add.overlap(this.ennemi1, this.groupeBullets, hit, null, this);

				this.physics.add.collider(this.ennemi2,this.platforms);
				this.physics.add.collider(this.ennemi2, this.player, hitEnnemi, null, this);
				this.physics.add.overlap(this.ennemi2, this.groupeBullets, hit, null, this);

		/*Ensemble des fonctions*/
		function hitEnnemi (frog, player) {
			this.nVies--;
			this.player.x = 100;
			this.player.y = 510;
		}

		function hit(ennemi, groupeBullets) {
			ennemi.disableBody(true, true);
			ennemi.setAlpha(0);
			groupeBullets.destroy(true);
		}

		function deleteBullet(groupeBullets, platforms) {
			groupeBullets.destroy(true);
		}

		function destroyBricks(player, brick) {
			if (this.player.body.touching.up /*&& this.cubes.body.touching.down*/)
            {
            	brick.disableBody(true, true);
            }
    	}

		function createStar(player, cube) {
            if (this.player.body.touching.up)
            {
            	cube.disableBody(true, true);
            	var star = this.physics.add.image(this.player.x,this.player.y - 120, 'noir');
            	star.setGravityY(300);
            	this.physics.add.collider(star,this.platforms);
	   			this.physics.add.overlap(this.player, star, collectStar, null, this);
            	this.physics.add.collider(star,this.cubes);

            	function collectStar (player, star)
				{
				    star.disableBody(true, true);
				    this.score += 10;
				    this.scoreText.setText('' + this.score);
				}
            }
    	}

		function fadeLevel(player, hBox) {
			/*Affaiblissement de l'écran - début de la transition vers la scene suivante*/
			this.cameras.main.fade(0xf0f, 4000);
			this.timedEvent = this.time.delayedCall(5000, changeLevel, [], this);
		}

		function changeLevel() {
			this.scene.start('MarioC');
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

			if (Phaser.Input.Keyboard.JustDown(this.fire)) {
				
				if (this.player.direction == 'right') {
					this.coefDir = 1;
				}

				if (this.player.direction == 'left') {
					this.coefDir = -1;
				}

			    if (this.player.direction == 'left') 
			    { 
			    	this.coefDir = -1; 
			    } 
			    else 
			    { 
			    	this.coefDir = 1 
			    }
		        
		        var bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
		        bullet.setScale(0.5);
		        bullet.body.allowGravity =false;
		        bullet.setVelocity(1000 * this.coefDir, 0); 
		    }

		/*Actualisation de la vie*/
			if(this.nVies == 2)
			{
				this.vie3.visible = false;
			}
			if(this.nVies == 1)
			{
				this.vie2.visible = false;
			}
			if(this.nVies == 0) 
			{
				this.vie1.visible = false;
				
				this.scene.start('hub');

			}
		
		/*Apparition d'un frog*/
			//Frog
		  	if(this.ennemi1.x >= 1400)
			{
				this.tweens.add({
			        targets: this.ennemi1,
			        x: 900,
			        duration: 5000,
			        ease: 'Linear'
				});
				
				this.ennemi1.setFlipX(false);
			}

			if(this.ennemi1.x <= 900)
			{
				this.tweens.add({
			        targets: this.ennemi1,
			        x: 1400,
			        duration: 5000,
			        ease: 'Linear'   
				});
				
				this.ennemi1.setFlipX(true);
			}

			if(this.ennemi2.x >= 2950)
			{
				this.tweens.add({
			        targets: this.ennemi2,
			        x: 2250,
			        duration: 5000,
			        ease: 'Linear'
				});
				
				this.ennemi2.setFlipX(false);
			}

			if(this.ennemi2.x <= 2250)
			{
				this.tweens.add({
			        targets: this.ennemi2,
			        x: 2950,	
			        duration: 5000,
			        ease: 'Linear'   
				});
				
				this.ennemi2.setFlipX(true);
			}
			console.log(this.nVies);
			if (this.player.y == 718) 
			{
				this.nVies--;
				this.player.x = 100;
				this.player.y = 490;
			}
	}
}