import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class LapButton extends Component {
	render() {
		return <Button onClick={this.props.onClick}>Lap  <Glyphicon glyph="repeat" /></Button>
	}
}

LapButton.propTypes = {
	onClick:  PropTypes.func
};

export default LapButton;