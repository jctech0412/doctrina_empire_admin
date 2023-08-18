import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateStudent } from "../../actions/studentActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class StudentUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            first_name: this.props.record.first_name,
            last_name: this.props.record.last_name,
            email: this.props.record.email,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                first_name: nextProps.record.first_name,
                last_name: nextProps.record.last_name,
                email: nextProps.record.email,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.student !== undefined
            && nextProps.student.students !== undefined
            && nextProps.student.students.data !== undefined
            && nextProps.student.students.data.message !== undefined
            && nextProps.student.students.data.success) {
            $('#update-student-modal').modal('hide');
            toast(nextProps.student.students.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'student-update-first_name') {
            this.setState({ first_name: e.target.value });
        }
        if (e.target.id === 'student-update-last_name') {
            this.setState({ last_name: e.target.value });
        }
        if (e.target.id === 'student-update-email') {
            this.setState({ email: e.target.value });
        }
    };

    onStudentUpdate = e => {
        e.preventDefault();
        const newStudent = {
            _id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        };
        this.props.updateStudent(newStudent);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-student-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Student</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onStudentUpdate} id="update-student">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="student-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">First_name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.first_name}
                                                id="student-update-first_name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.first_name
                                                })}/>
                                            <span className="text-danger">{errors.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Last_name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.last_name}
                                                id="student-update-last_name"
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
                                                id="student-update-email"
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
                                    form="update-student"
                                    className="btn btn-primary">
                                    Update Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StudentUpdateModal.propTypes = {
    updateStudent: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    student: state.student,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateStudent }
)(withRouter(StudentUpdateModal));
