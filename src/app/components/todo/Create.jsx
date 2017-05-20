import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
let { Component } = React;
var self;
export class TodoCreate extends Component{

  constructor(props) {
    super(props);

    self = this;

   this.state = {
      title:'',
      description:'',
      endDate:''
    }
  }
  
  componentWillMount () {
    //this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');   
  }

  componentWillUnmount () {
    this.firebaseRef.off();
  }

  onTitleChange (e) {
    self.setState({
	    title: e.target.value
	});
  }

  onDescriptionChange (e) {
    self.setState({
	    description: e.target.value
	});
  }

  handleDateChange(date) {
    self.setState({
      startDate: date
    });
  }

  removeItem (key) {
    var firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/');
    firebaseRef.child(key).remove();
  }

  handleSubmit (e) {
    e.preventDefault();
    if (self.state.title) {
      self.firebaseRef.push({			
				title: self.state.title,
				description: self.state.description
	  });

      self.setState({			
				title: '',
				description:''
	  });
    }
  }

  render() {
    return (
      <div className="todoEdit">        
        <form className="form-group" onSubmit={ this.handleSubmit }>
			<div>
				<input className="form-control" onChange={ this.onTitleChange } value={ this.state.title } placeholder="Add title" />
		    </div>
			<div>  
				<textarea className="form-control"  onChange={ this.onDescriptionChange } value={ this.state.description } placeholder="Add Description"/>
			</div> 
             <button className="btn btn-primary" >{ 'Save'}</button>
        </form>
      </div>
    );
  }
}

