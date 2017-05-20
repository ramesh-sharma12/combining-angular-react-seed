import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
let { Component } = React;
var self;
export class TodoEdit extends Component{

    constructor(props) {
    super(props);

    self = this;

    this.state = {
      title:'',
      description:'',
      endDate:''
    }
  }

  componentWillMount() {
    let { id } = this.props.params;
    this.firebaseRef = new Firebase('https://ng2do.firebaseio.com/data/' + id);
    this.firebaseRef.on('value', function(dataSnapshot) {
      var item = dataSnapshot.val();
      this.setState({
        title: item.title
      });
	  this.setState({
		    description:item.description
      });
    }.bind(this)); 
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

onTitleChange(e) {
    self.setState({
	    title: e.target.value
	});
  }

  onDescriptionChange(e) {
    self.setState({
	    description: e.target.value
	});
  }

handleSubmit(e) {
    e.preventDefault();
    if (self.state.title) {
  		if(self.firebaseRef){
  			self.firebaseRef.update({			
  						title: self.state.title,
  						description: self.state.description
  			  });

        window.location.href = '/';
  		}
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