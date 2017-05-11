
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TIMER_STARTED = 'TIMER_STARTED';
export const TIMER_TICK = 'TIMER_TICK';
export const PLAYER_LAP = 'PLAYER_LAP';
export const PLAYER_RESET = 'PLAYER_RESET';
export const SHOW_HISTORY = 'SHOW_HISTORY';
export const SHOW_TIMER = 'SHOW_TIMER';
export const DELETE_RACE = 'DELETE_RACE';
export const CANCEL_TIMER = 'CANCEL_TIMER';
export const PREPARE_START = 'PREPARE_START';
export const PREPARE_END = 'PREPARE_END';
export const SETUP_TICK = 'SETUP_TICK';
export const UPDATE_HISTORIC_DESCRIPTION = 'UPDATE_HISTORIC_DESCRIPTION';

const _timerStarted = intervalId => ({ type: TIMER_STARTED, intervalId });
const _timerTick = elapsedTime => ({ type: TIMER_TICK, elapsedTime });
const _startTimer = time => ({ type: START_TIMER, time });
const _stopTimer = player => ({ type: STOP_TIMER, player, time: new Date().getTime() });
const _playerLap = player => ({ type: PLAYER_LAP, player });
const _setupTimeTick = prepareTime => ({ type: SETUP_TICK, prepareTime });
export const resetPlayers = players => ({ type: PLAYER_RESET, players });


export function stopTimer(player) {
	return function(dispatch, getState) {
		dispatch(_stopTimer(player));
		const { players, intervalId } = getState();
		if (players.every(player => player.finished)) {
			clearInterval(intervalId);
		}		
	};
}

export function startTimer(players) {
	return function(dispatch, getState) {
		dispatch(resetPlayers(players));
		const { workout } = getState();

		const startActualTimer = () => {
			const start = new Date().getTime();
			dispatch(_startTimer(start));
			const interval = setInterval(function() {
				const now = new Date().getTime();
				dispatch(_timerTick(now - start));
			}, 10);
			dispatch(_timerStarted(interval));	
		};
		if (workout.setupTime) {
			const setupStart = new Date().getTime();
			const interval = setInterval(() => {
				const now = new Date().getTime();
				const elapsedTime = now - setupStart;
				dispatch(_setupTimeTick(workout.setupTime - elapsedTime));

				if (elapsedTime >= workout.setupTime) {
					clearInterval(interval);
					dispatch({ type: PREPARE_END });
					startActualTimer();
				}
			}, 10);
			dispatch({ type: PREPARE_START, interval });
		} else {
			startActualTimer();
		}
	};
}

export function playerLap(player) {
	return function(dispatch){
		dispatch(_playerLap(player));
	};
}

export function deleteRace(timestamp){
	return function(dispatch){
		setTimeout(() => dispatch({type: DELETE_RACE, timestamp}), 10);		// timeout lets the router transtion go 1st so we dont delete stuff needed in curent view
	};
}

export function cancelTimer() {
	return function(dispatch, getState){
		dispatch({ type: CANCEL_TIMER });
		const { intervalId } = getState();
		clearInterval(intervalId);

		const { prepareIntervalId } = getState();
		clearInterval(prepareIntervalId);
			
	};
}

export const updateHistoricDescription = (description, timestamp) => dispatch => dispatch({ type: UPDATE_HISTORIC_DESCRIPTION, description, timestamp });