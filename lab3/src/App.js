import './App.css';
import React from 'react';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import inventory from './inventory.ES6';
import ShoppingBag from './ShoppingBag';
import './styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
        const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory} send={this.send} />;
        const composeViewElem = (params) => <ViewOrder {...params} order={this.state.cart} remove={this.remove} />;
        return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="jumbo-text">Café 2000</h1>
                <p className="jumbo-desc">Beställ dina konstgjorda salader</p> 
            </div>
            <div>
                <Router>    
                    <ul className="nav nav-pills">
                        <li className="nav-item"><Link className="nav-link" to='/'>Hem</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/view-order'>Dina beställningar</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/compose-salad'>Komponera din egen sallad</Link></li>
                        {/* more links */}
                    </ul>
                    <Route exact path="/view-order" component={composeViewElem} />
                    <Route exact path="/compose-salad" component={composeSaladElem} />
                </Router>
            </div>
        </div>
        );
    }
}

export default App;
