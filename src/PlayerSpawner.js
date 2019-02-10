import 'phaser';
import  Player from './Player';

class PlayerSpawner
{
    constructor(game, tileManager)
    {
        this.tileManager = tileManager;
        this.player = new Player(this.CreatePlayer(game), game, tileManager);
    }

    Update()
    {
        this.player.Update();
    }

    CreatePlayer(game)
    {
        let havePosition = false;
        let position = this.GenerateRandomPosition();

        while(!havePosition)
        {
            position = this.tileManager.CheckSpawnPos(position);

            if(position.spawn)
            {
                havePosition = true;
            }
            else
            {
                position = this.GenerateRandomPosition();
            }
        }


        return game.physics.add.sprite(position.position.x, position.position.y, "Player").setOrigin(0,0);
    }

    GenerateRandomPosition()
    {
        return {x: Math.random() * 700, y: Math.random() * 700}
    }
}

export default PlayerSpawner;