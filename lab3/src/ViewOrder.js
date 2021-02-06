import React from 'react';

class ViewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.remove(event.target.value); 
    }

    render() {
        return(
            <div>
                <div className="view-order p-3 d-flex justify-content-center flex-wrap">
                    <ul className="list-group  w-50">
                        {this.props.order.salads.map(salad => {
                            return(
                                <li key={salad.id} className="list-group-item">
                                    <span><button type="button" onClick={this.handleClick} value={salad.id} className="btn btn-danger float-right">Remove</button></span>
                                    <span className="price">{`${salad.price()} kr`}</span>
                                    <br/>
                                    <span className="ingredients">{salad.toString()}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="total-cost">
                    <p>{`Totalt: ${this.props.order.price()} kr`}</p>
                </div>
            </div>
        );
    }
}

export default ViewOrder;