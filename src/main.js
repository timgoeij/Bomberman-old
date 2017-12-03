import Game from "./Game/Game"
import FirebaseControllerClient from "./Firebase/FirebaseControllerClient"
import FireBaseControllerServer from "./Firebase/FireBaseControllerServer"

window.CLIENT_ID = "";
window.SERVER_CLIENTS_MAP = new Map();

/*var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};*/

var game = new Game();

/*var serverController = new FireBaseControllerServer();
var clientController = new FirebaseControllerClient();*/

/*function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}*/
