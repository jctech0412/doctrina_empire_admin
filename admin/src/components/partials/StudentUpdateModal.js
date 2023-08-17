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
            firstname: this.props.record.firstname,
            lastname: this.props.record.lastname,
            gender: this.props.record.gender,
            email: this.props.record.email,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                firstname: nextProps.record.firstname,
                lastname: nextProps.record.lastname,
                gender: nextProps.record.gender,
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
        if (e.target.id === 'student-update-firstname') {
            this.setState({ firstname: e.target.value });
        }
        if (e.target.id === 'student-update-lastname') {
            this.setState({ lastname: e.target.value });
        }
        if (e.target.id === 'student-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'student-update-gender') {
            this.setState({ gender: e.target.value });
        }
    };

    onStudentUpdate = e => {
        e.preventDefault();
        const newStudent = {
            _id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            gender: this.state.gender
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
                                            <label htmlFor="name">FirstName</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="student-update-firstname"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.firstname
                                                })}/>
                                            <span className="text-danger">{errors.firstname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">LastName</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                id="student-update-lastname"
                                                type="text"
                                                error={errors.lastname}
                                                className={classnames("form-control", {
                                                    invalid: errors.lastname
                                                })}/>
                                            <span className="text-danger">{errors.lastname}</span>
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
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Gender</label>
                                        </div>
                                        <div className="col-md-9">
                                                <select
                                                    onChange={this.onChange}
                                                    value={this.state.gender}
                                                    id='student-update-gender'
                                                    error={errors.gender}
                                                    className={classnames('form-control', {
                                                        invalid: errors.gender
                                                    })}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            <span className="text-danger">{errors.gender}</span>
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
