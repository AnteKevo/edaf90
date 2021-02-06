import './App.css';
import React from 'react';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';
import inventory from './inventory.ES6';
import ShoppingBag from './ShoppingBag';
import './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cart: new ShoppingBag()};

        this.send = this.send.bind(this);
        this.remove = this.remove.bind(this);
    }

    send(target) {
        let saladList = this.state.cart;
        saladList.add(target);
        this.setState({cart: saladList});
    }

    remove(id) {
        let saladList = this.state.cart;
        saladList.remove(id);
        this.setState({cart: saladList});
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1 className="jumbo-text">Café 2000</h1>
                    <p className="jumbo-desc">Beställ dina konstgjorda salader</p> 
                </div>
                <div>
                    <ComposeSaladModal inventory={inventory} send={this.send} />
                    <ViewOrder order={this.state.cart} remove={this.remove} />
                    <div className="total-cost">
                            <p>{`Totalt: ${this.state.cart.price()} kr`}</p> 
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
