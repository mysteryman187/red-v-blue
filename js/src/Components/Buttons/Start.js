import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class StartButton extends Component {
	render() {
		return <Button onClick={this.props.onClick}>Start</Button>
	}
}

StartButton.propTypes = {
	onClick:  PropTypes.func
};

export default StartButton;