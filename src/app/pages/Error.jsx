import React from 'react';
import PropTypes from 'prop-types';
let { Component } = React;
export class ErrorPage  extends Component{

	constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
		Page Not found.
      </div>
    );
  }
}
