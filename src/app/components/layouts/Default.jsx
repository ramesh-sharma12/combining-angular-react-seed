
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {DefaultRoute, Route, Router, RouteHandler} from 'react-router';

export class DefaultLayout extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>            
    		<div className="contents">
    			<div className="container">
    				 {this.props.children}
    			 </div>
    		</div> 
        <div className="navbar-footer">
          <div className="container">
            footer....
          </div>
        </div>
      </div>
    );
  }
}
