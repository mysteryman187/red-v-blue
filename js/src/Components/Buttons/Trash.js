import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class TrashButton extends Component {
	render() {
		return <Button onClick={this.props.onClick} className="btn-trash"><Glyphicon glyph="trash"/></Button>
	}
}

TrashButton.propTypes = {
	onClick:  PropTypes.func
};

export default TrashButton;