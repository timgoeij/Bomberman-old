import 'phaser'
import Wood from './Tiles/Wood'
import Stone from './Tiles/Stone'

class TileManager
{
    constructor(game)
    {
        this.TileGroup = game.physics.add.staticGroup();
        this.TileList = [];

        this.grid = this.CreateGrid();

        this.CreateTiles(this.grid);
    }

    CreateGrid()
    {
        let grid = new Array(25);
        let mapWidth = 25;

        for(let h = 0; h < grid.length; h++) {
            grid[h] = [];

            for (let w = 0; w < mapWidth; w++) {
                if (h === 0 || h === mapWidth - 1) {
                    grid[h][w] = 1;
                    continue;
                }


                if (h % 2 === 0 && w % 2 === 0) {
                    grid[h][w] = 1;
                }
                else {
                    if (w === 0 || w === mapWidth - 1) {
                        grid[h][w] = 1;
                    }
                    else {
                        grid[h][w] = 0;
                    }

                }
            }
        }

        return this.CreateWoodPlaces(grid);
    }

    CreateWoodPlaces(grid)
    {
        for(let h = 0; h < grid.length; h++)
        {
            for(let w = 0; w < grid[h].length; w++) {
                if (grid[h][w] === 1) {
                    continue;
                }

                let random = Math.random();

                grid[h][w] = random < 0.70 ? 2 : 0;
            }
        }
        return grid;
    }

    CreateTiles(grid)
    {
        for(let h = 0; h < grid.length; h++)
        {
            for(let w = 0; w < grid[h].length; w++)
            {
                let tileIndex = grid[h][w];

                if(tileIndex === 0)
                    continue;

                let tileType = tileIndex === 1 ? "Stone" : "Wood";
                let xPos = w * 28;
                let yPos = h * 28;

                let sprite = this.TileGroup.create(xPos, yPos, tileType).setOrigin(0,0);

                let tile = tileType === "Stone" ?  new Stone(tileType, sprite) : new Wood(tileType, sprite);

                this.AddTile(tile);
            }
        }
    }

    AddTile(tile)
    {
        this.TileList.push(tile);
    }

    DeleteTile(tile)
    {
        let index = this.TileList.indexOf(tile);

        this.TileList.splice(index, 1);
    }

    GetTileList()
    {
        return this.TileList;
    }

    GetTileGroup()
    {
        return this.TileGroup;
    }

    CheckSpawnPos(position)
    {
        let wIndex = Math.round(position.x / 28);
        let hIndex = Math.round(position.y / 28);

        let checkedIndex = this.CheckIndexIsInBounds(wIndex, hIndex);

        if(checkedIndex)
        {
            return {spawn: true,
                position:
                    {
                        x: wIndex * 28,
                        y: hIndex * 28
                    }};
        }
        else
        {
            return {spawn: false};
        }
    }

    CheckIndexIsInBounds(wIndex, hIndex)
    {
        if(hIndex >= this.grid.length - 1 || hIndex <= 1)
        {
            return false;
        }
        else
        {
            if(wIndex >= this.grid[hIndex].length -1 || wIndex <= 1 )
            {
                return false;
            }
        }

        let rightIndex = this.CheckIndex(wIndex + 1, hIndex);
        let leftIndex = this.CheckIndex(wIndex - 1, hIndex);
        let topIndex = this.CheckIndex(wIndex, hIndex -1);
        let bottomIndex = this.CheckIndex(wIndex, hIndex + 1);
        let positionIndex = this.CheckIndex(wIndex, hIndex);

        let horizontalFree = rightIndex || leftIndex;
        let verticalFree = topIndex || bottomIndex;

        return (horizontalFree && verticalFree) && positionIndex;
    }

    CheckIndex(wIndex, hIndex)
    {
        return this.grid[hIndex][wIndex] === 0;
    }

}

export default TileManager;