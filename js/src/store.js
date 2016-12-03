import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { start, stop } from './utils/nosleep';

const store = createStore(rootReducer, applyMiddleware(thunk));

let videoPlaying = false;
store.subscribe(() => {
	const { timerRunning } = store.getState();
	if (timerRunning && !videoPlaying) {
		start();
		videoPlaying = true;
	} else if(!timerRunning && videoPlaying) {
		stop();
		videoPlaying = false;
	}
});

const previousValues = {};
const persist = field => () => {
	const state = store.getState();
	const value = state[field]
	if (value !== previousValues[field]) {
		localStorage[field] = JSON.stringify(value);
		previousValues[field] = value;
	}
}

store.subscribe(persist('history'));
store.subscribe(persist('templates'));
store.subscribe(persist('workout'));

export default store;
