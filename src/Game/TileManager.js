import Tile from "./Object/Tile";

class TileManager {
    constructor(firebaseClient, tileGroup) {

        this.fbClient = firebaseClient;
        this.tileGroup = tileGroup;

        this.tileList = new Map();

    }

    GetTileList() {

        return this.tileList;

    }

    CreateTileList(grid, fromServer = false) {

        if(fromServer)
        {
            for (let tile of grid)
            {
                this.tileList.push(tile);
            }
        }
        else
        {
            for(let h = 0; h < grid.length; h++)
            {
                for(let w = 0; w < grid[h].length; w++)
                {
                    let imgKey = grid[h][w] === 1 ? "Stone" : "Wood";

                    let tile = new Tile(imgKey, this.tileGroup, w * 28, h * 28, this.tileList.length);
                    this.tileList.push(tile);
                }
            }

            this.fbClient.AddTilesOnServer(this.tileList);
        }
    }

    DeleteTile(tile, fromServer = false) {

        if(!fromServer)
        {
            this.fbClient.DeleteTileOnServer(tile);
        }

        this.tileList.splice(tile.GetClientId(), 1);
    }

    GetDeletedTileIdFromServer(tiles) {

        let deletedTile = null;

        for(let serverTile in tiles)
        {
            for(let listTile in this.tileList) {

                if (serverTile.GetClientId() === listTile.GetClientId()) {
                    deletedTile = listTile;
                }
            }
        }

        if(deletedTile !== null)
        {
            this.DeleteTile(deletedTile, true);
        }

    }
}