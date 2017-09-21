import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  FormControl,
  Radio,
  Button
} from 'react-bootstrap';

import { getDropDownItems, getSearchResults } from '../api/api';
import logo from '../logo.svg';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownItems: [],
      menuOpen: false,
      forceOpen: false,
      menuItemActive: 'one',
      searchText: ''
    };
  }

  componentWillMount() {
    // get all drop-down items
    this.getAllMenuItems();
  }

  getAllMenuItems = async () => {
    await getDropDownItems()
      .then(response => response.json())
      .then(
        dropDownItems => {
          this.setState({ dropDownItems });
        },
        e => {
          console.log(e);
        }
      );
  };

  dropDownToggle = newValue => {
    // toggle drop-down only if not menu-item
    if (this.forceOpen) {
      this.setState({ menuOpen: true });
      this.forceOpen = false;
    } else {
      this.setState({ menuOpen: newValue });
    }
  };

  onMenuItemSelect = eventKey => {
    this.forceOpen = true;
  };

  onMenuItemSelected = eventKey => {
    if (eventKey) {
      this.forceOpen = true;
      this.setState({ menuItemActive: eventKey });
      this.props.onMenuClick(`${eventKey} option selected.`);
    }
  };

  onRadioItemClicked = event => {
    if (event.target) {
      const value = event.target.value;
      this.onMenuItemSelected(value);
    }
  };

  onSearch = event => {
    if (event && event.target) {
      var searchText = event.target.value;
      this.setState({ searchText });
      // get all drop-down items
      getSearchResults(searchText)
        .then(response => response.json())
        .then(
          dropDownItems => {
            this.setState({ dropDownItems });
          },
          e => {
            console.log(e);
          }
        );
    }
  };

  clearAllFilters = () => {
    this.props.onMenuClick('cleared all');
    this.setState({ searchText: '' });
    this.getAllMenuItems();
  };

  render() {
    const dropDownItems = this.state.dropDownItems.map(item => (
      <MenuItem eventKey={item.name} key={item.id.toString()} value={item.name}>
        <Radio
          name="menu-item"
          checked={item.name === this.state.menuItemActive}
          value={item.name}
          onChange={this.onRadioItemClicked}
        >
          {item.name}
        </Radio>
      </MenuItem>
    ));

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown
            open={this.state.menuOpen}
            onToggle={val => this.dropDownToggle(val)}
            title="Tags"
            eventKey={this.state.menuItemActive}
            id="basic-nav-dropdown"
            onSelect={this.onMenuItemSelected}
          >
            <MenuItem key={'search'} onClick={this.onMenuItemSelect}>
              <FormControl
                type="text"
                value={this.state.searchText}
                placeholder="Search..."
                onChange={this.onSearch}
              />
            </MenuItem>

            <MenuItem divider />

            {dropDownItems}
          </NavDropdown>
        </Nav>
        <Navbar.Form pullLeft>
          <Button onClick={this.clearAllFilters}>CLEAR ALL FILTERS</Button>
        </Navbar.Form>
      </Navbar>
    );
  }
}

export default NavigationBar;
