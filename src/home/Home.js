import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Home = ({ selectedItem }) => (
  <Jumbotron>
    <div className="App-intro">
      <h3>Drop-down example</h3>
    </div>
    <div className="App-intro">
      <h4>
        STATUS: <em>{selectedItem}.</em>
      </h4>
    </div>
  </Jumbotron>
);

export default Home;
