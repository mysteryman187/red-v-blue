export const DESCRIPTION_CHANGE = 'DESCRIPTION_CHANGE';
export const SETUP_TIME_CHANGE = 'SETUP_TIME_CHANGE';

export const descriptionChange = description => dispatch => dispatch({ type: DESCRIPTION_CHANGE, description} );
export const setupTimeChange = setupTime => dispatch => dispatch({ type: SETUP_TIME_CHANGE, setupTime });

