import React, { PropTypes, Component } from 'react';

class Circle extends Component {
	render() {
		return <span className={`circle circle-${this.props.color}`}></span>
	}
}

Circle.propTypes = {
	color:  PropTypes.string
};

export default Circle;