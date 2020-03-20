var config = {
  width: 1024,
  height: 768,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        plugins: { attractors: true },
        debug: false
    }
  },
  scene: [Hub, Level1, Level2, Level3, Level3b, Level3c, Level4, fin]
};

var game = new Phaser.Game(config);
