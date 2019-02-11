import 'phaser';
import GameObject from "./GameObject";

class Bomb extends GameObject
{
    constructor(sprite, game, tileManager)
    {
        super(sprite);

        this.BombBeams = game.physics.add.group();

        this.game = game;

        this.tileManager = tileManager;

        game.time.delayedCall(5000, this.ActivateBeams, [], this);
        game.time.delayedCall(7000, this.Destroy, [], this);
    }

    Update()
    {

        this.game.physics.add.overlap(this.BombBeams, this.tileManager.GetTileGroup(),
            this.CheckCollisionBetweenBeamAndTiles, null, this);
    }
  
    Destroy()
    {
        this.game.physics.remove.overlap(this.BombBeams, this.tileManager.GetTileGroup(),
            this.CheckCollisionBetweenBeamAndTiles, null, this);
    }

    ActivateBeams()
    {
        let topBeam = this.BombBeams.create(this.sprite.x + (this.sprite.width / 2),
            (this.sprite.y + 28) + (this.sprite.height / 2), "Beam");

        topBeam.setFlipX(true);
        topBeam.setAngle(270);

       let downBeam = this.BombBeams.create(this.sprite.x + (this.sprite.width / 2),
            (this.sprite.y - 28) + (this.sprite.height / 2), "Beam");

       downBeam.setFlipX(true);
       downBeam.setAngle(90);

        let rightBeam = this.BombBeams.create((this.sprite.x + 28) + (this.sprite.width / 2),
            this.sprite.y + (this.sprite.height / 2), "Beam");

        let leftBeam = this.BombBeams.create((this.sprite.x - 28) + (this.sprite.width / 2),
            this.sprite.y + (this.sprite.height / 2), "Beam");

        leftBeam.setFlipY(true);
        leftBeam.setAngle(180);

        this.BombBeams.children.iterate( (child) =>
        {

            child.on("animationcomplete", () =>
            {
                child.destroy();

            }, this);

            child.anims.play("fire");
        });
    }

    CheckCollisionBetweenBeamAndTiles(beam, tile)
    {
        if(beam.anims.getProgress() >= 0.5)
        {
            for(let tileInList of this.tileManager.GetTileList())
            {
                if(tileInList.sprite === tile)
                {
                    if(tileInList.destructible)
                    {
                        tileInList.Destroy();
                        this.tileManager.DeleteTile(tileInList);
                    }
                }
            }
        }
    }
}

export default Bomb;