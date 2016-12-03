import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Clock from '../Components/Clock';
import Player from '../Components/Player';
import { startTimer, stopTimer, playerLap, cancelTimer } from '../actions/timerActions';
import PlayButton from '../Components/Buttons/Play';
import { Link  } from 'react-router'

class Play extends Component {

    componentWillMount() {
        this.props.router.setRouteLeaveHook(this.props.route, route => {
            this.props.cancel();
        });
    }
    render() {
        const players = Number(this.props.params.players);
    	const ifRunning = e => this.props.timerRunning ? e : null;
        const ifPreparing = e => this.props.preparing ? e : null;
    	const ifNotRunning = e => !this.props.timerRunning && !this.props.preparing ? e : null;
    	const ifRunningOrFinished = e => this.props.timerRunning || this.props.players.some(p => p.laps.length) ?  e : null;
        const renderPlayer = (player, index) => <Player key={ index }
                                                        index={ index }
                                                        player={ player }
                                                        onFinish={ e => this.props.playerFinish(index) }
                                                        onLap={ e => this.props.playerLap(index) } />;

            return <div>
            			<Link to={'/'} className="nav-link">Back</Link>
                        <div className="main-clock">
                            <div className="main-clock-inner">
                                { ifRunning(<Clock time={this.props.time}/>) }
                                { ifPreparing(<Clock time={this.props.prepareTime}/>) }
                                { ifNotRunning(<PlayButton onClick={this.props.start}/>) }
                            </div>
                        </div>
                        { ifRunningOrFinished(<div className={`players players-${players}`}>{ this.props.players.map(renderPlayer) }</div>) }
                    </div>;
    }
}


Play.propTypes = {
    preparing: PropTypes.bool.isRequired,
    prepareTime: PropTypes.number.isRequired,
    timerRunning: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    playerFinish: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    playerLap: PropTypes.func.isRequired, 
    start: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        laps: PropTypes.arrayOf(PropTypes.shape({ }).isRequired).isRequired
    }).isRequired).isRequired,
};

function mapPropsToDispatch(dispatch, ownProps) {
    return {
        playerFinish: player => { 
            dispatch(playerLap(player));
            dispatch(stopTimer(player));
        },
        playerLap: player => dispatch(playerLap(player)),
        start: () => dispatch(startTimer(Number(ownProps.params.players))),
        cancel: () => dispatch(cancelTimer())    
    };
}

function mapStateToProps(state){
    return {
        time: state.elapsedTime,
        prepareTime: state.prepareTime,
        preparing: state.preparing,
        players: state.players,
        timerRunning: state.timerRunning
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(Play);