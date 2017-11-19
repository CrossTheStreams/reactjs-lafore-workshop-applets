import React, { Component } from 'react';
import { PageHeader, Grid, Col, Panel } from 'react-bootstrap';

export default class WorkshopLayout extends Component {

  //constructor(props) {
    //super(props);
  //}
  
  render() {
    return (
      <div className="WorkshopLayout container">
        <Grid>
          <PageHeader>
            {this.props.title}
          </PageHeader>
          <Col xs={12} md={9}>
            <Panel>
              {this.props.leftPanelContent}
            </Panel>
          </Col>
          <Col xs={6} md={3}>
            <Panel>
              {this.props.rightPanelContent}
            </Panel>
          </Col>
        </Grid>
      </div>
    )
  }

}
