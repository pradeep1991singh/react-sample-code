import React, { Component } from 'react';

import NavigationBar from '../NavigationBar';
import './header.css';

class Header extends Component {
  render() {
    return <NavigationBar onMenuClick={this.props.onMenuClick} />;
  }
}

export default Header;
