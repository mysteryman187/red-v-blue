import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { descriptionChange, setupTimeChange, applyTemplate } from '../actions/PreWorkoutActions';
import { resetPlayers } from '../actions/timerActions';
import { Button, Glyphicon } from 'react-bootstrap'
import StartButton from '../Components/Buttons/Start';
import Template from '../Components/Template';

class PreWorkout extends Component {
	componentWillMount() {
	    this.props.router.setRouteLeaveHook(this.props.route, route => {
	        if (route.pathname === 'play/1' || route.pathname === 'play/2') {
	            const players = Number(route.pathname.split('/')[1]);
	            this.props.resetPlayers(players);                
	        }
	    });
	}
    render() {
    	const backTo = encodeURIComponent(`setup/${this.props.params.players}`);
        return <div>
        			<Link to={'/'} className="nav-link">Back</Link>
        			<Link to={`templates/${backTo}`}>
        				<Button>
        					Pick Template 
        					<Glyphicon glyph="send"/>
        				</Button>
        			</Link>
					<Link to={`play/${this.props.params.players}`} className="nav-link"><StartButton/></Link>
        			<Template setupTime={this.props.setupTime}
        					  setupTimeChange={this.props.setupTimeChange}
        					  description={this.props.description}
        					  descriptionChange={this.props.descriptionChange}/>					
                </div>;
    }
}

PreWorkout.propTypes = {
	setupTime: PropTypes.number,
	setupTimeChange: PropTypes.func.isRequired,
	description: PropTypes.string,
	descriptionChange: PropTypes.func.isRequired,
    resetPlayers: PropTypes.func.isRequired
};

function mapPropsToDispatch(dispatch, ownProps) {
    return {
    	setupTimeChange: event => dispatch(setupTimeChange(Number(event.target.value))),
    	descriptionChange: event =>  dispatch(descriptionChange(event.target.value)),
        resetPlayers: players => dispatch(resetPlayers(players))  
    };
}

function mapStateToProps(state){
    return {
    	setupTime: state.workout.setupTime,
    	description: state.workout.description
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(PreWorkout);