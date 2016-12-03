export const DESCRIPTION_CHANGE_CREATE = 'DESCRIPTION_CHANGE_CREATE';
export const DESCRIPTION_CHANGE_EDIT = 'DESCRIPTION_CHANGE_EDIT';
export const SETUP_TIME_CHANGE_CREATE = 'SETUP_TIME_CHANGE_CREATE';
export const SETUP_TIME_CHANGE_EDIT = 'SETUP_TIME_CHANGE_EDIT';
export const NAME_CHANGE_CREATE = 'NAME_CHANGE_CREATE';
export const NAME_CHANGE_EDIT = 'NAME_CHANGE_EDIT';
export const SAVE_TEMPLATE = 'SAVE_TEMPLATE';
export const RESET_TEMPLATE = 'RESET_TEMPLATE';
export const APPLY_TEMPLATE = 'APPLY_TEMPLATE';

export const setupTimeChange = {
	edit : (setupTime, template) => dispatch => dispatch({type: SETUP_TIME_CHANGE_EDIT, setupTime, template }),
	create: setupTime => dispatch => dispatch({type: SETUP_TIME_CHANGE_CREATE, setupTime })
};

export const descriptionChange = {
	edit : (description, template) => dispatch => dispatch({type: DESCRIPTION_CHANGE_EDIT, description, template }),
	create: description => dispatch => dispatch({type: DESCRIPTION_CHANGE_CREATE, description })
};

export const nameChange = {
	edit : (name, template) => dispatch => dispatch({type: NAME_CHANGE_EDIT, name, template }),
	create: name => dispatch => dispatch({type: NAME_CHANGE_CREATE, name })
};

export const resetTemplate = () => dispatch => dispatch({type: RESET_TEMPLATE});
export const saveTemplate = () => dispatch => dispatch({type: SAVE_TEMPLATE});

export const applyTemplate = template => dispatch => {
	dispatch({ type: APPLY_TEMPLATE, template });
};