import React, { Component } from 'react';
import WorkshopLayout from './WorkshopLayout';

export default class OrderedArrayWS extends Component {
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


