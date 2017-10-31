import React, { Component } from 'react';
import { PageHeader, Grid, Col, 
  Navbar, Jumbotron, Button, 
  ListGroup, Nav, NavDropdown, 
  MenuItem, Panel } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div> 
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Lafore Workshop Applets</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Nav>
                  <NavDropdown title="Workshop Applets" id="basic-nav-dropdown">
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

class WorkshopLayout extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div class="WorkshopLayout container">
        <Grid>
          <PageHeader>
            {this.props.title}
          </PageHeader>
          <Col xs={12} md={7}>
            <Panel>
              {this.props.leftPanelContent}
            </Panel>
          </Col>
          <Col xs={6} md={5}>
            <Panel>
              {this.props.rightPanelContent}
            </Panel>
          </Col>
        </Grid>
      </div>
    )
  }

}

class ArrayWS extends Component {
  render() {
    return (
      <WorkshopLayout
        title={
          <div>
            <h1>Array</h1>
          </div>
        }
        leftPanelContent={
          <div>
            <p>Some content for the left panel</p>
          </div>
        }
        rightPanelContent={
          <div>
            <p>Some content for the right panel</p>
          </div>
        }
      />
    )
  }
}

class OrderedArrayWS extends Component {
  render() {
    return(
      <WorkshopLayout
        title={
          <div>
            <h1>Ordered Array</h1>
          </div>
        }
        leftPanelContent={
          <div>
            <p>Some content for the left panel</p>
          </div>
        }
        rightPanelContent={
          <div>
            <p>Some content for the right panel</p>
          </div>
        }
      />
    )
  }
}


export default App;
