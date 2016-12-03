import { combineReducers } from 'redux'
import { START_TIMER,
        STOP_TIMER,
        TIMER_STARTED,
        TIMER_TICK,
        PLAYER_LAP,
        PLAYER_RESET,
        DELETE_RACE,
        CANCEL_TIMER,
        SETUP_TICK,
        PREPARE_START,
        PREPARE_END } from './actions/timerActions';
import { DESCRIPTION_CHANGE,
        SETUP_TIME_CHANGE } from './actions/PreWorkoutActions';
import { DESCRIPTION_CHANGE_CREATE,
        DESCRIPTION_CHANGE_EDIT,
        SETUP_TIME_CHANGE_CREATE,
        SETUP_TIME_CHANGE_EDIT,
        NAME_CHANGE_CREATE,
        NAME_CHANGE_EDIT,
        RESET_TEMPLATE,
        SAVE_TEMPLATE,
        APPLY_TEMPLATE } from './actions/templateActions';

const DEFAULT_PLAYER_STATE = {
    finished: false,
    time: 0,
    laps: [],
    lapTime: 0
};

const DEFAULT_PLAYERS_STATE = [ 
    { ...DEFAULT_PLAYER_STATE },
    { ...DEFAULT_PLAYER_STATE }
];

const localStorageWorkout = JSON.parse(localStorage.workout || '{}');
const localStorageHistory = JSON.parse(localStorage.history || '[]');
const localStorageTemplates = JSON.parse(localStorage.templates || '[]');

function intervalId(state = null, action) {
    switch(action.type){
        case TIMER_STARTED:
          return action.intervalId;
        default:
            return state;
    }
}

function updatePlayer(state, action, index) {
    switch (action.type) {
        case TIMER_TICK: 
            return {
                ...state,
                time: action.elapsedTime,
                lapTime: state.laps.length ? action.elapsedTime - state.laps[state.laps.length - 1].time : action.elapsedTime
            };
        case PLAYER_LAP:
            if (action.player === index) {
                return { ...state, laps: [ ...state.laps, { time: state.time, lapTime: state.lapTime } ] };
            } else {
                return state;
            }
        default:
            return state;
    }
}

function players(state = DEFAULT_PLAYERS_STATE, action) {
    switch(action.type) {
        case STOP_TIMER:
            return state.map((player, index) => ({ ...player, finished: player.finished || action.player === index }) );
        case TIMER_TICK:
        case PLAYER_LAP:
            return state.map((player, index) => player.finished ? { ...player } : updatePlayer(player, action, index) );
        case PLAYER_RESET:  // when timer is started
            const newState = [];
            for (let i = 0; i < action.players; i++) {
                newState.push({ ...DEFAULT_PLAYER_STATE });
            };
            return newState;
        default:
            return state;
    }
}

function startTime(state = 0, action) {
    switch (action.type) {
        case START_TIMER: 
            return action.time;
        default:
            return state;
    }
}

function elapsedTime(state = 0, action){
    switch (action.type) {
        case TIMER_TICK: 
            return action.elapsedTime;
        default:
            return state;
    }
}

function timerRunning(state = false, players, action) {
    switch (action.type) {
        case START_TIMER: 
            return true;
        case STOP_TIMER:
            return !players.every(player => player.finished);
        case CANCEL_TIMER:
            return false;
        default:
            return state;
    }
}

function history(state = localStorageHistory, players, workout, action){
    switch(action.type) {
        case STOP_TIMER:
            if (players.every(player => player.finished)) {
                return [... state, { timestamp: new Date().getTime(), players, workout } ];
            } else {
                return state;
            }
        case DELETE_RACE:
            return state.filter(history => history.timestamp !== action.timestamp);
        default:
            return state;
    }
}

function workout(state = localStorageWorkout, templates, action) {
    switch(action.type) {
        case DESCRIPTION_CHANGE:
            return { ...state, description: action.description };
        case SETUP_TIME_CHANGE:
            return { ...state, setupTime: action.setupTime};
        case APPLY_TEMPLATE:
            return { ...state, ...templates[action.template] };
        default:
            return state;
    }
}

function templates(state = localStorageTemplates, createdTemplate, action) {
    switch(action.type) {
        case DESCRIPTION_CHANGE_EDIT:
            return state.map((template, index) => {
                if (index === action.template) {
                    return { ...template, description: action.description };                   
                }
                return { ...template };
            });
        case SETUP_TIME_CHANGE_EDIT:
            return state.map((template, index) => {
                if (index === action.template) {
                    return { ...template, setupTime: action.setupTime };                   
                }
                return { ...template };
            });
        case NAME_CHANGE_EDIT: 
            return state.map((template, index) => {
                if (index === action.template) {
                    return { ...template, name: action.name };                   
                }
                return { ...template };
            });
        case SAVE_TEMPLATE:
            return [ ...state, { ...createdTemplate } ];
        default:
            return state;
    }
}

function tempTemplate(state = {}, action) {
    switch(action.type) {
        case DESCRIPTION_CHANGE_CREATE:
            return { ...state, description: action.description };    
        case SETUP_TIME_CHANGE_CREATE:
            return { ...state, setupTime: action.setupTime };
        case NAME_CHANGE_CREATE:
            return { ...state, name: action.name };
        case RESET_TEMPLATE:
            return {};
        default:
            return state;
    }
}

function prepareTime(state = 0, action) {
    switch (action.type) {
        case SETUP_TICK:
            return action.prepareTime;
        default:
            return state;
    }
}

function preparing(state = false, action) {
    switch (action.type) {
        case PREPARE_START:
            return true;
        case PREPARE_END:
        case CANCEL_TIMER:
            return false;
        default:
            return state;
    }
}

function prepareIntervalId(state = 0, action){
    switch (action.type) {
        case PREPARE_START:
            return action.interval;
        default:
            return state;
    }
}

function rootReducer(state = {}, action) {
    const _intervalId = intervalId(state.intervalId, action);
    const _players = players(state.players, action);
    const _startTime = startTime(state.startTime, action);
    const _elapsedTime = elapsedTime(state.elapsedTime, action);
    const _timerRunning = timerRunning(state.timerRunning, _players, action);             
    const _tempTemplate = tempTemplate(state.tempTemplate, action);
    const _templates = templates(state.templates, _tempTemplate, action);
    const _workout = workout(state.workout, _templates, action);
    const _history = history(state.history, _players, _workout, action);
    const _prepareTime = prepareTime(state.prepareTime, action);
    const _preparing = preparing(state.preparing, action);
    const _prepareIntervalId = prepareIntervalId(state.prepareIntervalId, action);

    return {
        intervalId: _intervalId,
        players: _players,
        startTime: _startTime,
        elapsedTime: _elapsedTime,
        timerRunning: _timerRunning,       
        history: _history,
        workout: _workout,
        templates: _templates,
        tempTemplate: _tempTemplate,
        preparing: _preparing,
        prepareTime: _prepareTime,
        prepareIntervalId: _prepareIntervalId
    };
}

export default rootReducer;