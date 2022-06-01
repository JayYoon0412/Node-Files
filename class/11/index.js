class Monster {
    power = 10;

    Monster() {
        
    }

    attack = () => {
    console.log('attacking...')
    console.log(`my attack: ${this.power}!`)
    }

    run = () => {
        console.log('running away...')
    }
}

const myMonster = new Monster();
myMonster.run()