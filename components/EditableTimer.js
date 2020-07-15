import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editFormOpen: false,
		}
	}

	handleEditPress = () => {
    	this.setState({ editFormOpen: true });
  	};

  	handleFormClose = () => {
    	this.setState({ editFormOpen: false });
  	};

  	handleSubmit = timer => {
   		const { onFormSubmit } = this.props;
    	onFormSubmit(timer);
    	this.setState({ editFormOpen: false }); 
  	};

	render() {
		const { id, title, project, elapsed, isRunning } = this.props;
		const { editFormOpen } = this.state;

	  if (editFormOpen) {
	  		return (
		    	<TimerForm 
		    		id={id} 
		    		title={title} 
		    		project={project}
		    		onFormSubmit={this.handleSubmit}
						onFormClose={this.handleFormClose}
		    	/>
	    	);
	  }
	  return (
	    <Timer
	      id={id}
	      title={title}
	      project={project}
	      elapsed={elapsed}
	      isRunning={isRunning}
	      onEditPress={this.handleEditPress}
	    />
	  );
	}
}