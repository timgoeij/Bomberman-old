import 'phaser'
import Tile from "./Tile"

class Wood extends Tile
{
    constructor(type, sprite)
    {
        super(type, sprite);

        this.destructible = true;
    }
}

export default Wood;