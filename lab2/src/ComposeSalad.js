import React from 'react';
import Salad from './Salad';

class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {foundation: '', proteins: [], extras: [], dressing: ''};

        this.updateFoundation = this.updateFoundation.bind(this);
        this.updateProtein = this.updateProtein.bind(this);
        this.updateExtra = this.updateExtra.bind(this);
        this.updateDressing = this.updateDressing.bind(this);
        this.compose = this.compose.bind(this);
    }

    updateFoundation(event) {
        this.setState({foundation: event.target.value});
    }

    updateProtein(event) {
        let proteins = this.state.proteins;
        
        if(event.target.checked) {
            proteins.push(event.target.value);
        } else {
            proteins = proteins.filter(name => name !== event.target.value);
        }

        this.setState({proteins: proteins});
    }

    updateExtra(event) {
        let extras = this.state.extras;
        
        if(event.target.checked) {
            extras.push(event.target.value);
        } else {
            extras = extras.filter(name => name !== event.target.value);
        }

        this.setState({extras: extras});
    }

    updateDressing(event) {
        this.setState({dressing: event.target.value});
    }

    compose(event) {
        event.preventDefault();
        let salad = new Salad();
        salad.add('foundation', this.state.foundation);
        this.state.proteins.map(name => salad.add('proteins', name));
        this.state.extras.map(name => salad.add('extras', name));
        salad.add('dressing', this.state.dressing);
        this.props.send(salad);
        this.setState({foundation: '', proteins: [], extras: [], dressing: ''})
    }

    render() {
        const inventory = this.props.inventory;
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        let extras = Object.keys(inventory).filter(name => inventory[name].extra);
        let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);

        return(
            <div className="container">
                <form id="salad-form" onSubmit={this.compose}>
                    <select value={this.state.foundation} className="form-control" aria-label="Välj bas" onChange={this.updateFoundation}>
                        <option value='' disabled>Välj en bas</option>
                        {foundations.map(name => <option key={name} value={name}>{name + " +" + inventory[name].price + " kr"}</option>)}
                    </select>

                    <h5>Proteiner</h5>

                    {proteins.map(name => {
                            return(
                                <div className="form-check" key={name}>
                                    <input id={name + "_checkbox"} className="form-check-input" type="checkbox" value={name} onChange={this.updateProtein}
                                    checked={this.state.proteins.includes(name)}/>
                                    <label className="form-check-label" htmlFor={name + "_checkbox"}>
                                        {name + " +" + inventory[name].price + " kr"}
                                    </label>
                                </div>
                            );
                        })
                    }

                    <h5>Extra tillägg</h5>

                    {extras.map(name => {
                            return(
                                <div className="form-check" key={name}>
                                    <input id={name + "_checkbox"} className="form-check-input" type="checkbox" value={name} onChange={this.updateExtra} 
                                    checked={this.state.extras.includes(name)}/>
                                    <label className="form-check-label" htmlFor={name + "_checkbox"}>
                                        {name + " +" + inventory[name].price + " kr"}
                                    </label>
                                </div>
                            );
                        })
                    }

                    <select id="dressing" value={this.state.dressing} className="form-control" aria-label="Välj dressing" onChange={this.updateDressing}>
                        <option value='' disabled>Välj en dressing</option>
                        {dressings.map(name => <option key={name} value={name}>{name + " +" + inventory[name].price + " kr"}</option>)}
                    </select>
                </form>
            </div>
        );
    }
}

export default ComposeSalad;