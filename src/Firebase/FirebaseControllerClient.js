import firebase from "firebase";


class FirebaseControllerClient
{
    constructor()
    {
        /*let config = {
            apiKey: "AIzaSyCLgZcW2qlfsRge2s2FtP2MGTHb7Lc4Kgs",
            authDomain: "ns-medialab.firebaseapp.com",
            databaseURL: "https://ns-medialab.firebaseio.com",
            projectId: "ns-medialab",
            storageBucket: "ns-medialab.appspot.com",
            messagingSenderId: "288907259790"
        };
        firebase.initializeApp(config);*/

        window.CLIENT_ID = firebase.database().ref().child("Server").push().key;
        firebase.database().ref().child("Server/"+window.CLIENT_ID).update(
            {
                "ClientId": window.CLIENT_ID,
            }
        );

        firebase.database().ref("Client").limitToLast(1).once("child_added", (snapshot) => {

            console.log("this client added");

        });

        firebase.database().ref("Client").orderByChild("ClientId").equalTo(window.CLIENT_ID.toString()).on("child_changed", (snapshot) =>
        {
            this.CheckChanges(snapshot);
        })
    }

    CheckChanges(snapshot)
    {
        console.log(window.CLIENT_ID);
        console.log(snapshot.key);
        console.log(snapshot.val());
    }

    AddTilesOnServer(tiles)
    {
        let convertedArray = this.ConvertTilesToJSON(tiles);

        firebase.database().ref("Server/"+window.CLIENT_ID).update(
            {
                "Grid": convertedArray
            }
        )
    }

    ConvertTilesToJSON(tiles)
    {
        let jsonTileArray = [];

        for(let tile in tiles)
        {
            let jsonTile = {"Id": tile.GetClientId()};
            jsonTileArray.push(jsonTile);
        }

        return jsonTileArray;
    }

    DeleteTileOnServer(tile)
    {
        let deletedReference = firebase.database().ref("Server/"+ window.CLIENT_ID+"/Grid/"+tile.GetClientId());

        deletedReference.remove();
    }
}

export default FirebaseControllerClient;