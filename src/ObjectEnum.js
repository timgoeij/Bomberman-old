import {Enum} from "enumify"

class ObjectEnum extends Enum {}
ObjectEnum.initEnum(["PLAYER", "TILES", "BOMB"]);

export default ObjectEnum;