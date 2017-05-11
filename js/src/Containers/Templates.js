import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { applyTemplate } from '../actions/templateActions';
import { Button, Glyphicon, Table } from 'react-bootstrap';

class Templates extends Component {
    render() {
    	const b = encodeURIComponent(this.props.params.backTo);
        return <div>
                    <div className="flex-nav">
        			    <Link to={`${this.props.params.backTo}`} className="nav-link">Back</Link>
        			    <Link to={`templates/${b}/create`}>
        				    <Button bsStyle="primary" bsSize="xsmall">
        					    Create 
        					    <Glyphicon glyph="plus"/>
        				    </Button>
        			    </Link>
                    </div>
					<Table bordered striped className="templates-table">
                        <tbody>
                            { this.props.templates.map((template, index) => 
					   	       <tr key={index}>
                                    <td className="grow">
                                        <strong>{ template.name }</strong>
                                    </td>
                                    <td>
                                        <Button bsStyle="primary" bsSize="small" onClick={ e => this.props.applyTemplate(index) }>
                                            { 'Apply' }
                                        </Button>
                                    </td>
                                    <td>
                                        <Link to={`templates/${b}/edit/${index}`}>
                                            <Button bsStyle="primary" bsSize="xsmall">
                                                { 'Edit' }
                                            </Button>
                                        </Link>
                                    </td>                                    
							    </tr>    
						) }
                        </tbody>
                    </Table>
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