import Salad from './Salad';

class ShoppingBag {
    constructor(salads = []){
        this.salads = salads;
    }

    add(salad) {
        if(salad instanceof Salad) {
            this.salads.push(salad);
        } else {
            console.log('This is not a Salad!');
        }

        return this;
    }

    remove(id) {
        this.salads = this.salads.filter(salad => salad.id !== parseInt(id));
        return this;
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

export default ShoppingBag;