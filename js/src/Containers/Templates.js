import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { applyTemplate } from '../actions/templateActions';
import { Button, Glyphicon } from 'react-bootstrap';

class Templates extends Component {
    render() {
    	const b = encodeURIComponent(this.props.params.backTo);
        return <div>
        			<Link to={`${this.props.params.backTo}`} className="nav-link">Back</Link>
        			<Link to={`templates/${b}/create`}>
        				<Button>
        					Create 
        					<Glyphicon glyph="plus"/>
        				</Button>
        			</Link>
					{ this.props.templates.map((template, index) => 
						<div key={index}>
							{ template.name }
								<Button onClick={ e => this.props.applyTemplate(index) }>
									{ 'Apply' }
								</Button>
								<Link to={`templates/${b}/edit/${index}`}>
									<Button>
										{ 'Edit' }
									</Button>
								</Link>
						</div>
						) }	
                </div>;
    }
}

Templates.propTypes = {
    templates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    applyTemplate: PropTypes.func.isRequired
};

function mapPropsToDispatch(dispatch, ownProps) {
    return {
        applyTemplate: template => { 
        	dispatch(applyTemplate(template));
        	ownProps.router.push(ownProps.params.backTo);
        }  
    };
}

function mapStateToProps(state){
    return {
    	templates: state.templates
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(Templates);