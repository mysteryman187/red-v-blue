import React, { PropTypes, Component } from 'react';
import Clock from './Clock';
import { Button, Glyphicon } from 'react-bootstrap';
import FinishButton from './buttons/Finish';
import LapButton from './buttons/Lap';
const HOUR = 1000 * 60 * 60;
export const format = time => time >= HOUR ? moment(time).format('HH:mm:ss:SS') : moment(time).format('mm:ss:SS');

class Player extends Component {
    render() {
    	const ifFinished = e => this.props.player.finished ? e : null;
        const ifNotFinished = e => !this.props.player.finished ? e : null;
        const ifLaps = e => this.props.player.laps.length ? e : null;
        const ifLapHandler = e => this.props.onLap ? e : null;
        const ifFinishHandler = e => this.props.onFinish ? e : null;
  
        return <div className={`player player-${this.props.index} ${this.props.player.finished ? 'finished' : ''}`}>
        			{ ifNotFinished(ifLaps(<div className="lap-time player-lap-time"><Clock time={this.props.player.lapTime}/></div>)) }
        			{ ifFinished(<div className="player-total-time"><Clock time={this.props.player.time}/></div>) }
        			{ ifNotFinished(ifLapHandler(<LapButton onClick={this.props.onLap}/>)) }
        			{ ifNotFinished(ifFinishHandler(<FinishButton onClick={this.props.onFinish}/>)) }
        			<div className="laps">
        				{ this.props.player.laps.map( (lap, index) => 
        					<div key={index} className="lap">
        						<span>{index + 1}.</span>
        						<div><Clock time={lap.time}/></div>
        						<div className="lap-time"><Clock time={lap.lapTime}/></div>
        					</div> 
        				) }
        			</div>
        		</div>;
    }
}

Player.propTypes = {
	index: PropTypes.number.isRequired,
	onFinish: PropTypes.func,
	onLap: PropTypes.func,
	player: PropTypes.shape({
		time: PropTypes.number.isRequired,
		lapTime: PropTypes.number.isRequired,
		finished: PropTypes.bool.isRequired,
		laps: PropTypes.arrayOf(PropTypes.shape({
			time: PropTypes.number.isRequired,
			lapTime:PropTypes.number.isRequired
		}).isRequired).isRequired
	}).isRequired
};

export default Player;