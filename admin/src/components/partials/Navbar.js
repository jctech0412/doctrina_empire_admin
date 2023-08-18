import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import './partials.css'

class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container-fluid p-0">
                <div className="height-fix">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <a className="navbar-brand" href="/">Doctrina Empire</a>
                        <button 
                            className="navbar-toggler" 
                            type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" 
                            aria-controls="navbarNavDropdown" 
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse dropdown-menu-pr" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a 
                                        className="nav-link dropdown-toggle" 
                                        id="settings"
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false">
                                        {user.name}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-pr" aria-labelledby="settings">
                                        <a className="dropdown-item dropdown-menu-pr" >
                                            <FontAwesomeIcon icon={faAddressBook} /> Profile 
                                        </a>
                                        <a className="dropdown-item dropdown-menu-pr" onClick={this.onLogoutClick}> 
                                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout  
                                        </a>
                                    </div>
                                </li>
{/* 
                                <li className="nav-item active">
                                    <a className="nav-link" href="#" onClick={this.onLogoutClick}>Logout ({user.name}) <FontAwesomeIcon icon={faSignOutAlt} /> </a>
                                </li> */}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
