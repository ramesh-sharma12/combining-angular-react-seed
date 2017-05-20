import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
let { Component } = React;
export class TodoDetails extends Component{
	constructor(props) {
    	super(props);

    	this.state = {
    		id : '',
	        title :'',
	        description:''	
    	}
  }

  componentWillMount() {
    let { id } = this.props.params
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/' + id);
    this.firebaseRef.on('value', function(dataSnapshot) {
      var item = dataSnapshot.val();
      this.setState({
	    id:dataSnapshot.name(),
        title: item.title,
		description:item.description
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    return (  
        <div className="todoDetails">
			<div className="row header-panel"> 
			   <span className="col-sm-10"> <h3>Task Description </h3> </span>
			   <span className="col-sm-2">
			    <Link className="btn btn-primary" to={`/todo/edit/${this.state.id}`}>{ 'Edit'} </Link> 
				</span>
			</div>
			<div className="content">
				<div> { this.state.title} </div>
				<div> { this.state.description} </div>
			</div>
        </div>
    );
  }
}