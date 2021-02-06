import inventory from './inventory.ES6';

const keys = Object.keys(inventory);
const foundation = keys.filter(key => 'foundation' in inventory[key]);
const proteins = keys.filter(key => 'protein' in inventory[key]);
const extras = keys.filter(key => 'extra' in inventory[key]);
const dressing = keys.filter(key => 'dressing' in inventory[key]);

let nextId = -1;

class Salad {
    constructor() {
        this.foundation = {};
        this.proteins = [];
        this.extras = [];
        this.dressing = {};

        function getUniqueId() {
            return ++nextId;
        }

        this.id = getUniqueId();
    }

    add(type, selection) {
        switch(type) {
            case "foundation":
                this.foundation = foundation.includes(selection) ? {name: selection, ...inventory[selection]} : this.foundation;
                break;
            case "proteins":
                if(!this.proteins.find(item => item.name === selection) && proteins.includes(selection)) {
                    this.proteins.push({name: selection, ...inventory[selection]});
                }
                break;
            case "extras":
                if(!this.extras.find(item => item.name === selection) && extras.includes(selection)) {
                    this.extras.push({name: selection, ...inventory[selection]});
                }
                break;
            case "dressing":
                this.dressing = dressing.includes(selection) ? {name: selection, ...inventory[selection]} : this.dressing;
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

    toString() {
        return [].concat(this.foundation, this.proteins, this.extras, this.dressing).reduce((prev, curr) => {
            if(!(Object.keys(curr).length === 0 && curr.constructor === Object)) {
                return prev += (curr.name + ', ');
            } else {
                return prev;
            }
        }, '').slice(0, -2);
    }
}

export default Salad;