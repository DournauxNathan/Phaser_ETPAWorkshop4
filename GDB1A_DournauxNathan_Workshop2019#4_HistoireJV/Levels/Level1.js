class Level1 extends Phaser.Scene {
    constructor() {
        super("SpaceWar");
    }

    init() {

	}

	preload() {
		this.load.image('pship','assets/perso.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('space', 'assets/space.png');
		this.load.image('ship','assets/ship.png');
		this.load.image('1','assets/1.png');


		this.load.image('tuto1','assets/tuto1.png');
		this.load.image('BLACK','assets/BLACK.png');
	}

	create() {
		this.bullets;
		this.lastFired = 0;

		this.add.image(0,0,'space').setOrigin(0,0).setScale(2);

		this.physics.world.setBounds(0, 0, 1024, 768);

		
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

		this.bullets = this.physics.add.group({
	        classType: this.Bullet,
	        maxSize: 30,
	        runChildUpdate: true
    	});

		this.player = this.physics.add.sprite(100,450,'pship');
		this.player.setCollideWorldBounds(true);

		this.fragment = this.physics.add.sprite(500,360,'1');
	    this.fragment.visible = false;
	    this.ships = this.physics.add.group()
	    this.ships.create(150,100,'ship').setScale(2);
	    this.ships.create(950,620,'ship').setScale(2);
	    this.ships.create(500,500,'ship').setScale(2);

		this.groupeBullets = this.physics.add.group();

		this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
		this.keys = this.input.keyboard.addKeys('Z,Q,S,D'); 

		
		this.physics.add.overlap(this.groupeBullets,this.ships, hit, null,this);
		this.physics.add.overlap(this.groupeBullets,this.ships, deleteBullet, null,this);

		function hit(ship, groupeBullets) {
			ship.disableBody(true, true);
			groupeBullets.destroy(true);

			if (this.ships.countActive(true) === 0)
		    {
		    	this.fragment.visible = true;
		    	this.physics.add.overlap(this.player,this.fragment, fadeLevel, null,this);
		    }
		}	

		function deleteBullet(groupeBullets, platforms) {
			groupeBullets.destroy(true);
		}

		function fadeLevel(player, fragment) {
			this.cameras.main.fade(0xf0f, 4000);
			this.timedEvent = this.time.delayedCall(5000, changeLevel, [], this);
		}

		function changeLevel() {
			this.scene.start('hub');
		}

		this.BLACK = this.add.image(0,0,'BLACK').setOrigin(0,0);
		this.tuto = this.add.image(512,384,'tuto1');
		
		this.timedEvent3 = this.time.addEvent({ delay: 6000, callback: tuto, callbackScope: this, loop: true });

		function tuto()
		{
			this.tuto.visible = false
			this.BLACK.visible = false
		}
	}

	update() {
		/*Déplacement*/
			/*Haut & Bas*/
				if(this.keys.Z.isDown)
				{
			        this.physics.velocityFromRotation(this.player.rotation, 150	, this.player.body.acceleration);
			    }
			    else
			    {
			        this.player.setAcceleration(0);
			    }

			/*Gauche & Droite*/
				if(this.keys.Q.isDown)
				{	
					this.player.body.angularVelocity = -150;
					
				}
				else if(this.keys.D.isDown)
				{
					this.player.body.angularVelocity = 150;
				}
				else
			    {
			        this.player.body.angularVelocity = 0;
			    }

		/*Tir*/
			if (Phaser.Input.Keyboard.JustDown(this.fire))
			{
	            var bullet = this.groupeBullets.create(this.player.x, this.player.y, 'bullet');
		        bullet.setScale(0.15);

	            // this.setRotation(ship.rotation);
	            bullet.setAngle(this.player.body.rotation);

	            bullet.setVelocity(this.player.angle*2, this.player.angle*2); 
		   	}		    
	}
}