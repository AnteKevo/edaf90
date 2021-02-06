// Assignment 3

'use strict';
const imported = require("./inventory.js");
console.log(imported.inventory['Sallad']);

// Assignment 4

const keys = Object.keys(imported.inventory);
const foundation = keys.filter(key => 'foundation' in imported.inventory[key]);
const proteins = keys.filter(key => 'protein' in imported.inventory[key]);
const extras = keys.filter(key => 'extra' in imported.inventory[key]);
const dressing = keys.filter(key => 'dressing' in imported.inventory[key]);
console.log('Foundation: ' + foundation.toString());
console.log('Proteins: ' + proteins.toString());
console.log('Extras: ' + extras.toString());
console.log('Dressing: ' + dressing.toString());

// Assignment 5 - 7

class Salad {
    constructor() {
        this.foundation = {};
        this.proteins = [];
        this.extras = [];
        this.dressing = {};
    }

    add(type, selection) {
        switch(type) {
            case "foundation":
                this.foundation = foundation.includes(selection) ? {name: selection, ...imported.inventory[selection]} : this.foundation;
                break;
            case "proteins":
                if(!this.proteins.find(item => item.name === selection) && proteins.includes(selection)) {
                    this.proteins.push({name: selection, ...imported.inventory[selection]});
                }
                break;
            case "extras":
                if(!this.extras.find(item => item.name === selection) && extras.includes(selection)) {
                    this.extras.push({name: selection, ...imported.inventory[selection]});
                }
                break;
            case "dressing":
                this.dressing = dressing.includes(selection) ? {name: selection, ...imported.inventory[selection]} : this.dressing;
                break;
            default:
                console.error("Type not found.");
                break;
        }
    }

    remove(type, selection) {
        switch(type) {
            case "foundation":
                this.foundation = this.foundation.name === selection ? {} : this.foundation;
                break;
            case "proteins":
                this.proteins = this.proteins.filter(item => item.name !== selection);
                break;
            case "extras":
                this.extras = this.extras.filter(item => item.name !== selection);
                break;
            case "dressing":
                this.dressing = this.dressing.name === selection ? {} : this.dressing;
                break;
            default:
                console.error("Type not found.");
                break;
        }
    }

    price() {
        return [].concat(this.foundation, this.proteins, this.extras, this.dressing).reduce((prev, curr) => {
            if(!(Object.keys(curr).length === 0 && curr.constructor === Object)) {
                return prev += curr.price;
            } else {
                return prev;
            }
        }, 0);
    }
}

let myCaesarSalad = new Salad();
myCaesarSalad.add('foundation', 'Sallad');
myCaesarSalad.add('proteins', 'Kycklingfilé');
myCaesarSalad.add('extras', 'Krutonger');
myCaesarSalad.add('extras', 'Parmesan');
myCaesarSalad.add('dressing', 'Ceasardressing');
console.log(myCaesarSalad);
console.log(myCaesarSalad.price());
myCaesarSalad.remove('dressing', 'Ceasardressing')
console.log(myCaesarSalad.price())

// Assignment 8 - 9

class ExtraGreenSalad extends Salad {
    price() {
        return [].concat(this.foundation, this.proteins, this.extras, this.dressing).reduce((prev, curr) => {
            if(!(Object.keys(curr).length === 0 && curr.constructor === Object)) {
                if("foundation" in curr) {
                    return (prev += curr.price * 1.3);
                } else {
                    return (prev += curr.price * 0.5);
                }
            } else {
                return prev;
            }
            
        }, 0);
    }
}

let mySalad = new ExtraGreenSalad();
mySalad.add('foundation', 'Sallad');
mySalad.add('proteins', 'Kycklingfilé');
mySalad.add('extras', 'Krutonger');
mySalad.add('extras', 'Parmesan');
mySalad.add('dressing', 'Ceasardressing');
console.log(mySalad);
mySalad.remove('foundation', 'Sallad');
console.log(mySalad.price());

//  mySalad            ExtraGreenSalad.prototype   Salad.prototype     Object.prototype
//  --------------     -----------                 ------------        --------------
//  | foundation |     | price() |                 | add()    |        | toString() |
//  | proteins   |     |         |                 | remove() |        | valueOf()  |
//  | extras     | --> |         | --------------> | price()  | -----> |     .      | ----> null
//  | dressing   |     |         |                 |          |        |     .      |
//  |            |     |         |                 |          |        |     .      |
//  --------------     -----------                 ------------        --------------

// Assignment 10
class GourmetSalad extends Salad {
    add(type, selection, size) {
        switch(type) {
            case "foundation":
                this.foundation = foundation.includes(selection) ? {name: selection, size: size, ...imported.inventory[selection]} : this.foundation;
                break;
            case "proteins":
                if(!this.proteins.find(item => item.name === selection) && proteins.includes(selection)) {
                    this.proteins.push({name: selection, size: size, ...imported.inventory[selection]});
                }
                break;
            case "extras":
                if(!this.extras.find(item => item.name === selection) && extras.includes(selection)) {
                    this.extras.push({name: selection,  size: size, ...imported.inventory[selection]});
                }
                break;
            case "dressing":
                this.dressing = dressing.includes(selection) ? {name: selection, size: size, ...imported.inventory[selection]} : this.dressing;
                break;
            default:
                console.error("Type not found.");
                break;
        }
    }

    price() {
        return [].concat(this.foundation, this.proteins, this.extras, this.dressing).reduce((prev, curr) => {
            if(!(Object.keys(curr).length === 0 && curr.constructor === Object)) {
                return (prev += curr.price * curr.size);
            } else {
                return prev;
            }
        }, 0);
    }
}

let myGourmetSalad = new GourmetSalad();
myGourmetSalad.add('foundation', 'Sallad', 0.4);
myGourmetSalad.add('proteins', 'Kycklingfilé', 1.2);
myGourmetSalad.add('extras', 'Krutonger', 3);
myGourmetSalad.add('extras', 'Parmesan', 1.7);
myGourmetSalad.add('dressing', 'Ceasardressing', 0.2);
console.log(myGourmetSalad);
console.log(myGourmetSalad.price());
myGourmetSalad.remove('proteins', 'Kycklingfilé');
console.log(myGourmetSalad.price());


// Bonus Assignment

class ShoppingBag {
    constructor(){
        this.salads = [];
    }

    add(salad) {
        if(salad instanceof Salad) {
            this.salads.push(salad);
        } else {
            console.log('This is not a Salad!');
        }
    }

    remove(salad) {
        if(salad instanceof Salad) {
            const index = this.salads.indexOf(salad);
            if(index !== -1) {
                this.salads.splice(index, 1);
            } else {
                console.log('This salad is not in the shopping cart')
            }
        } else {
            console.log('This is not a Salad!');
        }
    }

    price() {
        return this.salads.reduce((prev, curr) => {
            if(!(Object.keys(curr).length === 0 && curr.constructor === Object)) {  
                return (prev += curr.price());
            } else {
                return prev;
            }
        }, 0)
    }
}

let myShoppingBag = new ShoppingBag();
myShoppingBag.add(mySalad);
myShoppingBag.add(myCaesarSalad);
myShoppingBag.add(myGourmetSalad);
console.log(myShoppingBag);
console.log(myShoppingBag.price());
myShoppingBag.remove(mySalad);
console.log(myShoppingBag.price());