import 'phaser'
import GameObject from "./GameObject";
import Bomb from "./Bomb";

class Player extends GameObject
{
    constructor(sprite, game, tileManager)
    {
        super(sprite);

        this.speed = 28;

        this.cursor = game.input.keyboard.createCursorKeys();

        this.game = game;
        this.tileManager = tileManager;

        this.bombDropped = false;

        this.bombGroup = game.physics.add.group();
        this.bombList = [];

        game.physics.add.collider(sprite, tileManager.GetTileGroup());
    }

    Update()
    {
        this.Input();

        this.game.physics.add.overlap(this.sprite, this.bombGroup);

        for(let bomb of this.bombList)
        {
            bomb.Update();
            this.game.physics.add.overlap(this.sprite, bomb.BombBeams, this.CheckCollisionsWirhBombs, null, this);

            if(bomb.isDead)
            {
                this.DeleteBombs(bomb);
            }
        }
    }

    Input()
    {
        if(this.cursor.left.isDown)
        {
            this.MoveHorizontal(-this.speed);
        }
        else if(this.cursor.right.isDown)
        {
            this.MoveHorizontal(this.speed);
        }
        else if(this.cursor.up.isDown)
        {
            this.MoveVertical(-this.speed);
        }
        else if(this.cursor.down.isDown)
        {
            this.MoveVertical(this.speed);
        }
        else
            this.sprite.setVelocity(0, 0, 0);

        if(this.cursor.space.isDown)
        {
            if(!this.bombDropped)
                this.CreateBomb();
        }
    }

    MoveHorizontal(speed)
    {
        this.sprite.setVelocityX(speed);
    }

    MoveVertical(speed)
    {
        this.sprite.setVelocityY(speed);
    }

    CreateBomb()
    {
        this.bombDropped = true;
        let bombSprite = this.bombGroup.create(this.sprite.x, this.sprite.y, "Bomb").setOrigin(0,0);

        let bomb = new Bomb(bombSprite, this.game, this.tileManager);
        this.bombList.push(bomb);

        this.game.time.delayedCall(3000, () =>
        {
            this.bombDropped = false;
        }, [], this);
    }

    CheckCollisionsWirhBombs(player, bomb)
    {
        if(bomb.anims.getProgress() >= 0.75)
            this.ResetPosition();
    }

    ResetPosition()
    {
        this.sprite.x = this.xPos;
        this.sprite.y = this.yPos;
    }

    DeleteBombs(bomb)
    {
        let index = this.bombList.indexOf(bomb);
        this.bombList.splice(index, 0);
    }
}

export default Player;