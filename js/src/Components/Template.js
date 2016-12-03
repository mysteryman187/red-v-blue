import React, { PropTypes, Component } from 'react';
import { FormGroup , ControlLabel, FormControl, form } from 'react-bootstrap'
import moment from 'moment';
export const format = time => moment(time).format('mm:ss');

class Template extends Component {
    render() {
    	let setupTimeOptions = [];
    	for (let i = 0; i < 59000; i+=1000) {
    		setupTimeOptions.push(<option key={i} value={i}>{format(i)}</option>);
    	};
        return <div>
        			<form>
					    <FormGroup controlId="setup-time">
					          <ControlLabel>Time for Prepare</ControlLabel>
					          <FormControl componentClass="select" value={this.props.setupTime} onChange={ this.props.setupTimeChange }>
					            { setupTimeOptions }
					          </FormControl>
					    </FormGroup>
					    <FormGroup controlId="description">
					    	<ControlLabel>Description</ControlLabel> 
					    	<FormControl componentClass="textarea" placeholder="description" value={this.props.description} onChange={ this.props.descriptionChange } /> 
					    </FormGroup>
					</form>
                </div>;
    }
}

Template.propTypes = {
	setupTime: PropTypes.number,
	setupTimeChange: PropTypes.func.isRequired,
	description: PropTypes.string,
	descriptionChange: PropTypes.func.isRequired
};

export default Template;