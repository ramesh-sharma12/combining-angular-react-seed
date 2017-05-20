
import React from 'react';
import PropTypes from 'prop-types';
import {TodoList} from '../components/todo/List.jsx';
import {TodoCreate} from '../components/todo/Create.jsx';

let { Component } = React;

export class TodosPage  extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
	   <TodoCreate />
       <TodoList />
      </div>
    );
  }
}