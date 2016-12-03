import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link  } from 'react-router';
import moment from 'moment';
import Circle from '../Components/Circle';

class History extends Component {
    render() {
    	const maybeRedCircle = history => history.players.length === 2 && history.players[0].time < history.players[1].time ? <Circle color={'red'}/> : null
		const maybeBlueCircle = history => history.players.length === 2 && history.players[1].time < history.players[0].time ? <Circle color={'blue'}/> : null
        const maybeSinglePlayer = history => history.players.length === 1 ? <span style={ {color: 'coral'} }>(Single)  </span> : null;
    	return <div>
    		<Link to={'/'} className="nav-link">Back</Link>
    		{ this.props.historyList.length ? this.props.historyList.map(history => <Link to={`/historic/${history.timestamp}`} key={history.timestamp}>
    					<Button className="btn-history">
                                { maybeSinglePlayer(history) }
    							{ maybeRedCircle(history) }
    							{ moment(history.timestamp).format('MMMM Do YYYY, h:mm a') }
    							{ maybeBlueCircle(history) }
    					</Button>
    				</Link>) : <h2 className="no-races">No races yet!</h2>
    		}
    	</div>;
    }
}

History.propTypes = {
    historyList: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        players: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired
    }).isRequired).isRequired,
};

function mapStateToProps(state){
    return {
        historyList: [ ...state.history ].sort(function(a, b){return a.timestamp - b.timestamp;})
    };
}

export default connect(mapStateToProps)(History);