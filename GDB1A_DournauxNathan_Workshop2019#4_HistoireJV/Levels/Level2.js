class Level2 extends Phaser.Scene {
    constructor() {
        super("Frogger");
    }

    init() {

	}

	preload() {
		this.load.image('frog','assets/frogger.png');
		this.load.image('2','assets/2.png');
		this.load.image('tiles', 'assets/road.png');
		this.load.image('cars','assets/cars.png');

		this.load.image('wood','assets/wood.png');

		this.load.image('tuto2','assets/tuto2.png');
		this.load.image('BLACK','assets/BLACK.png');

	}

	create() {
	    this.fragment = this.physics.add.sprite(500,50,'2');

	    this.player = this.physics.add.image(500,750,'frog');

		this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
		this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		this.group = this.physics.add.group({
	        defaultKey: 'cars',	
	        maxSize: -1 	
	    });

	    this.group2 = this.physics.add.group({
	        defaultKey: 'wood',
	        maxSize: -1 	
	    });
	    this.physics.add.overlap(this.group,this.player, hitPlayer, null, this);
	    this.physics.add.overlap(this.group2,this.player, hitPlayer, null, this);
		this.physics.add.overlap(this.player,this.fragment, fadeLevel, null, this);

		this.isLocked = true;

		this.timedEvent1 = this.time.addEvent({ delay: 2500, callback: onEvent1, callbackScope: this, loop: true });
		this.timedEvent2 = this.time.addEvent({ delay: 1850, callback: onEvent2, callbackScope: this, loop: true });
		this.timedEvent3 = this.time.addEvent({ delay: 2200, callback: onEvent3, callbackScope: this, loop: true });
		this.timedEvent3 = this.time.addEvent({ delay: 8000, callback: unlockPlayer, callbackScope: this, loop: true });
		
		this.group.visible = false;
		this.group2.visible = false;

		this.BLACK = this.add.image(0,0,'BLACK').setOrigin(0,0);
		this.tuto = this.add.image(512,384,'tuto2');

		this.timedEvent3 = this.time.addEvent({ delay: 6000, callback: tuto, callbackScope: this, loop: true });

		function tuto()
		{
			this.tuto.visible = false
			this.BLACK.visible = false
		}

		function unlockPlayer()
		{
		    this.isLocked = false;
		}

		function fadeLevel(player, fragment) {
			this.cameras.main.fade(0xf0f, 4000);
			this.timedEvent = this.time.delayedCall(5000, changeLevel, [], this);
		}

		function changeLevel() {
			this.scene.start('hub');
		}

		function onEvent1 ()
		{
		    this.group.create(1000, 700);
		    this.group2.create(1000, 100).setScale(0.75,1);
		}

		function onEvent2 ()
		{
		    this.group.create(1000, 500).setScale(1.3,1);
		    this.group2.create(1000, 300).setScale(0.75,1);
		}

		function onEvent3 ()
		{		    
			this.group.create(1000, 600);
			this.group2.create(1000, 200);
		}

		function hitPlayer(group, player)
		{
			this.player.x = 500;
			this.player.y = 750;
		}

		


	}

	update() {

		/*Obstacles*/
		
			Phaser.Actions.IncX(this.group.getChildren(), -1.5);
			Phaser.Actions.IncX(this.group2.getChildren(), -1.5);

		if (this.isLocked == false) 
		{
			//Left
		    if (Phaser.Input.Keyboard.JustDown(this.left)) {
	            this.player.x -= 50	;
	            this.player.angle = -90;
		    }

			//Right
			    if (Phaser.Input.Keyboard.JustDown(this.right)){
		            this.player.x += 50;
		            this.player.angle = 90;
			    }

		    //Up
			    if (Phaser.Input.Keyboard.JustDown(this.up)) {
		            this.player.y -= 50;
		            this.player.angle = 0;
			    }

		    //Down
			   	if (Phaser.Input.Keyboard.JustDown(this.down)) {
			            this.player.y += 50;
			            this.player.angle = 180;
			    }
		}
	}
}