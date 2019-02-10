import 'phaser'
import TileManager from './TileManager'
import PlayerSpawner from './PlayerSpawner'

class Game
{
    constructor()
    {
        let config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            backgroundColor: '#FFFFFF',
            width: 700,
            height: 700,
            physics: {
              default: 'arcade',
              arcade: {
                  gravity: { y: 0 },
                  debug: false
                }
              },
            scene: {
                preload: this.Preload,
                create: this.Create,
                update: this.Update
            }
        };

        this.game = new Phaser.Game(config);
        this.TileManager = null;
        this.PlayerSpawner = null;
    }

    Create()
    {
        let beamAnimationConfig =
            {
                key: "fire",
                frames: this.anims.generateFrameNumbers("Beam", {start: 0, end: 9, first: 0}),
                frameRate: 5
            };

        this.anims.create(beamAnimationConfig);

        this.TileManager = new TileManager(this);
        this.PlayerSpawner = new PlayerSpawner(this, this.TileManager);
    }

    Preload()
    {
        this.load.image("Wood", "img/Wood.png");
        this.load.image("Stone", "img/Stone.png");
        this.load.image("Player", "img/Player.png");
        this.load.image("Bomb", "img/Bomb.png");
        this.load.spritesheet("Beam", "img/Beam.png", {frameWidth: 28, frameHeight: 28, endFrame: 9});
    }

    Update()
    {
        this.PlayerSpawner.Update();
    }
}

export default Game;