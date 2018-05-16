import React from 'react';
import base from '../base';
import Header from './Header';
import Order from './Order';
import Fish from './Fish';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'


class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered 
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if there is any order saved already in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

    if (localStorageRef) {
      // update App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes: fishes })
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes: fishes});
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes: fishes });
  }

  removeFromOrder(key) {
    // take copy of current order state
    const order = {...this.state.order};

    // update order based on fish removal
    delete order[key];

    // update order state
    this.setState({ order: order });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take copy of current state
    const order = {...this.state.order};
    // update or add new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order: order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.params} 
          removeFromOrder={this.removeFromOrder} />
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes} 
          updateFish={this.updateFish} 
          removeFish={this.removeFish} />
      </div>
    )
  }
}

export default App;