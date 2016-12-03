import React, { PropTypes, Component } from 'react';
import moment from 'moment';
const HOUR = 1000 * 60 * 60;
export const format = time => time >= HOUR ? moment(time).format('HH:mm:ss:SS') : moment(time).format('mm:ss:SS');

class Clock extends Component {
    render() {
        return <div className="clock"><div className="digital clock-inner">{format(this.props.time)}</div></div>;
    }
}

Clock.propTypes = {
    time: PropTypes.number.isRequired
};

export default Clock;