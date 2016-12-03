import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class PlayButton extends Component {
	render() {
		return <Button onClick={this.props.onClick}><Glyphicon glyph="play" /></Button>
	}
}

PlayButton.propTypes = {
	onClick:  PropTypes.func
};

export default PlayButton;