import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup , ControlLabel, FormControl } from 'react-bootstrap'
import Player from '../Components/Player';
import TrashButton from '../Components/Buttons/Trash';
import _ from 'lodash';
import { Link } from 'react-router';
import { deleteRace, updateHistoricDescription } from '../actions/timerActions';

class Historic extends Component {
    render() {
        const players = this.props.players.length;
        const renderPlayer = (player, index) => <Player key={ index }
                                                        index={ index }
                                                        player={ player } />;

        return <div>
        			<Link to={'history'} className="nav-link">Back</Link>
        			<TrashButton onClick={this.props.deleteRace}/>
        			<div className={`players players-${players}`}>
                   		{ this.props.players.map(renderPlayer) }
               		</div>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel> 
                        <FormControl componentClass="textarea" placeholder="description" defaultValue={this.props.workout.description} onChange={ this.props.updateDescription } /> 
                    </FormGroup>
                </div>;
    }
}

Historic.propTypes = {
	deleteRace: PropTypes.func.isRequired,
    updateDescription: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    workout: PropTypes.shape({
        description: PropTypes.string
    }).isRequired
};

function mapPropsToDispatch(dispatch, ownProps) {
	return {
        updateDescription: (event) => {
            const newValue = event.target.value;
            dispatch(updateHistoricDescription(newValue, Number(ownProps.params.timestamp) ));
        },
		deleteRace: () => {
			ownProps.router.goBack();
			dispatch(deleteRace(Number(ownProps.params.timestamp)));
		}
	}
}
function mapStateToProps(state, ownProps){
	const historicRace = _.find(state.history, { timestamp: Number(ownProps.params.timestamp) });
    return {
        players: historicRace && historicRace.players,
        workout: historicRace && historicRace.workout
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(Historic);