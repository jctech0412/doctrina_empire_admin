import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStudent } from "../../actions/studentActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class StudentAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.student !== undefined
            && nextProps.student.students !== undefined
            && nextProps.student.students.data !== undefined
            && nextProps.student.students.data.message !== undefined) {
            $('#add-student-modal').modal('hide');
            toast(nextProps.student.students.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onStudentAdd = e => {
        e.preventDefault();
        const newStudent = {
            first_name: this.state.first_name,
            email: this.state.email,
            last_name: this.state.last_name,
        };
        this.props.addStudent(newStudent, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-student-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Student</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onStudentAdd} id="add-student">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Firstname</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.first_name}
                                                id="first_name"
                                                type="text"
                                                error={errors.first_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.first_name
                                                })}/>
                                            <span className="text-danger">{errors.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Lastname</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.last_name}
                                                id="last_name"
                                                type="text"
                                                error={errors.last_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.last_name
                                                })}/>
                                            <span className="text-danger">{errors.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
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
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-student"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StudentAddModal.propTypes = {
    addStudent: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    student: state.student,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addStudent }
)(withRouter(StudentAddModal));
