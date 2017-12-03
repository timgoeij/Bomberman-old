import firebase from "firebase";

class FireBaseControllerServer
{
    constructor()
    {
        let config = {
            apiKey: "AIzaSyCLgZcW2qlfsRge2s2FtP2MGTHb7Lc4Kgs",
            authDomain: "ns-medialab.firebaseapp.com",
            databaseURL: "https://ns-medialab.firebaseio.com",
            projectId: "ns-medialab",
            storageBucket: "ns-medialab.appspot.com",
            messagingSenderId: "288907259790"
        };
        firebase.initializeApp(config);

        firebase.database().ref().child("Server").on("child_added", (snapshot) =>
        {
            //console.log(snapshot.val());
            //console.log(snapshot.key);
            this.AddClient(snapshot);
        });
    }

    AddClient(snapshot)
    {
        if(window.SERVER_CLIENTS_MAP.has(snapshot.key))
            return;

        let serverID = firebase.database().ref().child("Client").push().key;
        let clientId = snapshot.key;
        window.SERVER_CLIENTS_MAP.set(clientId, serverID);

        this.SetupGrid(serverID, clientId);

        this.RefreshClientConnections()
    }

    CheckChanges(snapshot)
    {
        if(snapshot.val().changed.changer === "client")
        {
            switch (snapshot.val().changed.Property)
            {
                case "Players":
                    break;
                case "Tiles":
                    break;
                case "Bombs":
                    break;
                case "Death":
                    break;
            }
        }
    }

    CheckPlayers()
    {

    }

    CheckTiles(snapshot)
    {

    }

    CheckBombs(snapshot)
    {

    }

    RefreshClientConnections()
    {
        let clients = window.SERVER_CLIENTS_MAP;

        for(let key of clients.keys())
        {
            firebase.database().ref("Server/"+key).off("child_changed");

            firebase.database().ref("Server/"+key).on("child_changed", (snapshot) =>
            {
                this.CheckChanges(snapshot);
            });
        }
    }

    SetupGrid(serverId, clientId)
    {
        firebase.database().ref().child("ServerGrid").once("value", (snapshot) =>
        {

            let grid = this.GenerateGrid(new Array(25), 25);

            if(!snapshot.hasChild("Grid"))
            {
                firebase.database().ref().child("ServerGrid").update(
                    {
                        "Grid": grid
                    }
                );
            }
            else
            {
                grid = snapshot.val().Grid;
            }

            this.UploadGrid(serverId, clientId, grid)

        });
    }

    UploadGrid(serverId, clientId, grid)
    {
        let newChild = {
            "ClientId": clientId,
            "Grid": grid,
            "Changed":
                {
                    "Changer": "Server",
                    "Property": "Grid"
                }
        };


        firebase.database().ref("Client/"+serverId).update(newChild);
        firebase.database().ref("Server/"+clientId).update(newChild);
    }

    GenerateGrid(grid, mapWidth)
    {
        for(let h = 0; h < grid.length; h++)
        {
            grid[h] = [];

            for( let w = 0; w < mapWidth; w++)
            {
                if(h === 0 || h === mapWidth - 1)
                {
                    grid[h][w] = 1;
                    continue;
                }

                if(h%2 === 0  &&  w%2 === 0)
                {
                    grid[h][w] = 1;
                }
                else
                {
                    if(w === 0  || w === mapWidth -1)
                    {
                        grid[h][w] = 1;
                    }
                    else
                    {
                        let random = Math.random();

                        grid[h][w] = random < 0.70 ? 2 : 0;
                    }

                }
            }
        }

        return grid;
    }


}

export default FireBaseControllerServer;