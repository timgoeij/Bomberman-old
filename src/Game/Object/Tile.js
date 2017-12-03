import BaseObject from "./BaseObject"

class Tile extends BaseObject
{
    constructor(imgKey, tileGroup, xPos, yPos, id)
    {
        super(id, imgKey, tileGroup, xPos, yPos);

        this.type = imgKey;
        this.isDestroyable = this.type === "Wood";
    }

}