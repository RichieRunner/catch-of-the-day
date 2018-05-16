import React from 'react';
import PropTypes  from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }
  goToStore(event) {
    event.preventDefault();
    console.log('URL changed');
    // first grab value from textbox
    const storeId = this.myRef.value.value;
    console.log(storeId);
    this.props.history.push(`/store/${storeId}`)
    // use value in route
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}> 
      { /*comment in jsx inside parent*/ }  
        <h2>Please enter store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myRef}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: PropTypes.object
}

export default StorePicker;
