class BaseObject
{
    constructor(clientId = 0, imgKey, spriteGroup, xPos, yPos)
    {
        this.clientId = clientId;
        this.img = imgKey;
        this.spriteGroup = spriteGroup;

        this.sprite = "";
        this.dead = false;
        this.xPos = xPos;
        this.yPos = yPos;

        this.createObject()();
    }

    GetClientId()
    {
        return this.clientId;
    }

    createObject()
    {
        this.sprite = this.spriteGroup.create(this.xPos, this.yPos, this.img);
        this.sprite.velocity.x = 0;
        this.sprite.velocity.y = 0;
    }
}

export default BaseObject;