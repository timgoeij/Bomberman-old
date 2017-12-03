import 'phaser'

class Game
{
    constructor()
    {
        let config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: 700,
            height: 700,
            scene: {
                preload: this.Preload,
                create: this.Create,
                update: this.Update
            }
        };

        this.game = new Phaser.Game(config);
    }

    Preload()
    {
        this.load.image('logo', 'assets/logo.png');
    }

    Create()
    {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }

    Update()
    {

    }
}

export default Game;