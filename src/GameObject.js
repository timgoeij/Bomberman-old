import 'phaser'

class GameObject
{
    constructor(sprite)
    {
        this.isDead = false;
        this.sprite = sprite;
        this.xPos = sprite.x;
        this.yPos = sprite.y;
    }

    Update()
    {

    }

    Destroy()
    {
        this.sprite.destroy();
        this.isDead = true;
    }
}

export default GameObject