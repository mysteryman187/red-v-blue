import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormGroup , ControlLabel, FormControl, form } from 'react-bootstrap'
import { setupTimeChange, descriptionChange, nameChange, saveTemplate, resetTemplate } from '../actions/templateActions';
import Template from '../Components/Template';

class TemplateContainer extends Component {
	componentWillMount() {
		const template = this.props.params.template;
     	const isCreate = !template;

	    if (isCreate) {
	    	this.props.router.setRouteLeaveHook(this.props.route, route => {	     	
	     		if (this.isValid()) {
					this.props.save();	     			
	     		}
	    	});
		    this.props.reset();
	    }
	}
	isValid() {
		return this.props.workoutName && this.props.workoutName.length;
	}
    render() {
    	const validationState = this.isValid() ? 'success' : 'error';
        return <div>
        		<Link className="nav-link" onClick={ () => this.props.router.goBack() }>Back</Link>
        		<FormGroup controlId="template-name" validationState={`${validationState}`}>
        		      <ControlLabel>Workout Description</ControlLabel>
        		      <FormControl type="text" value={this.props.workoutName} onChange={ this.props.workoutNameChange }/>
        		</FormGroup>
        		<Template setupTime={this.props.setupTime}
        					  setupTimeChange={this.props.setupTimeChange}
        					  description={this.props.description}
        					  descriptionChange={this.props.descriptionChange}/>
        		
        	</div>;
    }
}

TemplateContainer.propTypes = {
	setupTime: PropTypes.number,
	setupTimeChange: PropTypes.func.isRequired,
	description: PropTypes.string,
	descriptionChange: PropTypes.func.isRequired,
	workoutName: PropTypes.string,
	workoutNameChange: PropTypes.func.isRequired,
	save: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

function mapPropsToDispatch(dispatch, ownProps) {
	const template = ownProps.params.template;
	// ..feels like there should be something better for this e.g. { edit as descEdit }
	const timeEdit = setupTimeChange.edit;
	const timeCreate = setupTimeChange.create;
    const descEdit = descriptionChange.edit;
    const descCreate = descriptionChange.create;
	const nameEdit = nameChange.edit;
    const nameCreate = nameChange.create;
    // this also smells...
    return {
    	setupTimeChange: event => dispatch(template ? timeEdit(Number(event.target.value), Number(template)) : timeCreate(Number(event.target.value)) ),
    	descriptionChange: event =>  dispatch(template ? descEdit(event.target.value, Number(template)) : descCreate(event.target.value) ),
    	workoutNameChange: event => dispatch(template ? nameEdit(event.target.value) : nameCreate(event.target.value) ),
    	save: () => dispatch(saveTemplate()),
    	reset: () => dispatch(resetTemplate())
    };
}


function mapStateToProps(state, ownProps) {
	const template = ownProps.params.template;
	if (template) {
		const { templates } = state;
		const selectedTemplate = templates[Number(template)];
		return {
			workoutName: selectedTemplate.name,
			...selectedTemplate
		};
	} else {
		return {
			workoutName: state.tempTemplate.name,
			...state.tempTemplate
		};
	}
}

export default connect(mapStateToProps, mapPropsToDispatch)(TemplateContainer);