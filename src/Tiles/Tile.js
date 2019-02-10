import 'phaser'
import GameObject from "../GameObject"

class Tile extends GameObject
{
    constructor(type, sprite)
    {
        super(sprite);

        this.type = type;
        this.destructible = false;
    }

    IsDestructible()
    {
        return this.destructible;
    }
}

export default Tile;