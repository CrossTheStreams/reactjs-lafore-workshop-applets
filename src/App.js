import React, { Component } from 'react';
import { 
  Grid,Navbar, Nav,
  NavDropdown, MenuItem
} from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ArrayWS from './ArrayWS';
import OrderedArrayWS from './OrderedArrayWS';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div> 
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Lafore Workshop Apps</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                  <NavDropdown title="Workshop Apps" id="basic-nav-dropdown">
                    <MenuItem href="/array">Array</MenuItem>
                    <MenuItem divider />
                    <MenuItem href="/ordered-array">OrderedArray</MenuItem>
                  </NavDropdown>
                </Nav>
              </Navbar.Header>
            </Grid>
          </Navbar>
          <Route path="/array" component={ArrayWS}/>
          <Route path="/ordered-array" component={OrderedArrayWS}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
