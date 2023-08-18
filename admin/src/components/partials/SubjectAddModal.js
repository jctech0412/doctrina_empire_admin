import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSubject } from "../../actions/subjectActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class SubjectAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.subject !== undefined
            && nextProps.subject.subjects !== undefined
            && nextProps.subject.subjects.data !== undefined
            && nextProps.subject.subjects.data.message !== undefined) {
            $('#add-subject-modal').modal('hide');
            toast(nextProps.subject.subjects.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubjectAdd = e => {
        e.preventDefault();
        const newSubject = {
            title: this.state.title,
            email: this.state.email,
            content: this.state.content
        };
        this.props.addSubject(newSubject, this.props.history);
        this.setState({
            title: "",
            content: "",
            errors: {},
        })
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-subject-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Subject</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSubjectAdd} id="add-subject">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">title</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.title}
                                                id="title"
                                                type="text"
                                                error={errors.title}
                                                className={classnames("form-control", {
                                                    invalid: errors.title
                                                })}/>
                                            <span className="text-danger">{errors.title}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">content</label>
                                        </div>
                                        <div className="col-md-9">
                                            <textarea
                                                onChange={this.onChange}
                                                value={this.state.content}
                                                id="content"
                                                type="text"
                                                error={errors.content}
                                                className={classnames("form-control", {
                                                    invalid: errors.content
                                                })}/>
                                            <span className="text-danger">{errors.content}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-subject"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Subject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SubjectAddModal.propTypes = {
    addSubject: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    subject: state.subject,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addSubject }
)(withRouter(SubjectAddModal));
