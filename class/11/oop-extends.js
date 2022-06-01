//공중, 지장
class Monster {
    power = 10;

    Monster(aaa) {

        this.power = aaa;
    }

    attack = () => {
        console.log("attack")
    }

}

class SkyMonster extends Monster {
    constructor(qqq) {
        super(qqq)
    }
    run = () => {
        console.log("flight!")
    }
}

class GroundMonster extends Monster{
    constructor(qqq) {
        super(qqq)
    }
    run = () => {
        console.log("running on ground!")
    }
}
