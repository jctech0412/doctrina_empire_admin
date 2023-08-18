import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSubject } from "../../actions/subjectActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class SubjectUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            title: this.props.record.title,
            content: this.props.record.content,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                title: nextProps.record.title,
                content: nextProps.record.content,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.subject.subjects !== undefined
            && nextProps.subject.subjects.data !== undefined
            && nextProps.subject.subjects.data.message !== undefined
            && nextProps.subject.subjects.data.success) {
            $('#update-subject-modal').modal('hide');
            toast(nextProps.subject.subjects.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'subject-update-content') {
            this.setState({ content: e.target.value });
        }
        if (e.target.id === 'subject-update-title') {
            this.setState({ title: e.target.value });
        }
    };

    onSubjectUpdate = e => {
        e.preventDefault();
        const newSubject = {
            _id: this.state.id,
            title: this.state.title,
            content: this.state.content
        };
        this.props.updateSubject(newSubject);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-subject-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Subject</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSubjectUpdate} id="update-subject">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="subject-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="title">Title</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.title}
                                                id="subject-update-title"
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
                                            <label htmlFor="content">content</label>
                                        </div>
                                        <div className="col-md-9">
                                            <textarea
                                                onChange={this.onChange}
                                                value={this.state.content}
                                                error={errors.content}
                                                id="subject-update-content"
                                                type="content"
                                                className={classnames("form-control", {
                                                    invalid: errors.content
                                                })}
                                            />
                                            <span className="text-danger">{errors.content}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-subject"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Subject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SubjectUpdateModal.propTypes = {
    updateSubject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    subject: state.subject,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateSubject }
)(withRouter(SubjectUpdateModal));
