import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link  } from 'react-router';

class Menu extends Component {
    render() {
    	return <div>
    		<Link to={'setup/1'}>
    			<Button>Single Player</Button>
    		</Link>
    		<Link to={'setup/2'}>
    			<Button>Multi Player</Button>
    		</Link>
            <Link to={'history'}>
                <Button>History</Button>
            </Link>
            <Link to={`templates/menu`}>
                <Button>Workouts</Button>
            </Link>
    	</div>;
    }
}



export default Menu;