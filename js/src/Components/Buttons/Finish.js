import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class FinishButton extends Component {
	render() {
		return <Button onClick={this.props.onClick}>Finish  <Glyphicon glyph="thumbs-up" /></Button>
	}
}

FinishButton.propTypes = {
	onClick:  PropTypes.func
};

export default FinishButton;