import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link  } from 'react-router';

class Menu extends Component {
    render() {
    	return <div>
    		<Link to={'setup/1'}>
    			<Button bsStyle="primary">Single Player</Button>
    		</Link>
    		<Link to={'setup/2'}>
    			<Button bsStyle="primary">Multi Player</Button>
    		</Link>
            <Link to={'history'}>
                <Button bsStyle="primary">History</Button>
            </Link>
            <Link to={`templates/menu`}>
                <Button bsStyle="primary">Workouts</Button>
            </Link>
    	</div>;
    }
}



export default Menu;