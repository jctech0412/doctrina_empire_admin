import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './auth.css'

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/users");
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/users");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="login-center">
                    <div className="row mt-5 ">
                        <div className="col-md-4 mx-auto my-center mt-5 card shadow-lg">
                            <div className="card-body p-1">
                                <h2 className="text-center text-primary mt-3">Login</h2>
                                <form noValidate onSubmit={this.onSubmit} className="white mr-4 ml-4">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("form-control", {
                                            invalid: errors.email
                                        })}
                                    />
                                    <span className="text-danger">{errors.email}</span>
                                    <br/>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("form-control", {
                                            invalid: errors.password
                                        })}
                                    />
                                    <span className="text-danger">{errors.password}</span>
                                    <p className="text-center pb-0 mt-4 mb-4">
                                        <button
                                            type="submit"
                                            className="btn btn-large btn-primary mt-2 px-5">
                                            Login
                                        </button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
