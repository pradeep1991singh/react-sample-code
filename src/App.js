import React, { Component } from 'react';

import Header from './components/header/Header';
import Home from './home/Home';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'No drop down item selected yet!'
    };
  }

  onMenuClick = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    let selectedItem = this.state.selectedItem;

    return (
      <div className="App">
        <div className="App-header">
          <Header onMenuClick={this.onMenuClick} />
        </div>
        <Home selectedItem={selectedItem} />
      </div>
    );
  }
}

export default App;
