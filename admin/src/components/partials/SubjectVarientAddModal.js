import React from 'react'
import className from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSubject } from "../../actions/subjectActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import ReactDataTable from '@ashvin27/react-datatable';
import $ from 'jquery';

class SubjectVarientAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
            errors: {},
        };
        // this.config = {
        //     page_size: 10,
        //     length_menu: [ 10, 20, 50 ],
        //     filename: "Varient",
        //     no_data_text: 'No Varient found!',
        //     button: {
        //         excel: true,
        //         print: true,
        //         csv: true
        //     },
        //     language: {
        //         length_menu: "Show _MENU_ result per page",
        //         filter: "Filter in records...",
        //         info: "Showing _START_ to _END_ of _TOTAL_ records",
        //         pagination: {
        //             first: "First",
        //             previous: "Previous",
        //             next: "Next",
        //             last: "Last"
        //         }
        //     },
        //     show_length_menu: true,
        //     show_filter: true,
        //     show_pagination: true,
        //     show_info: true,
        // };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.subject !== undefined
            && nextProps.subject.subjects !== undefined
            && nextProps.subject.subjects.data !== undefined
            && nextProps.subject.subjects.data.message !== undefined) {
            $('#add-varient-modal').modal('hide');
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
    addVarient = e => {

    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-varient-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Varients</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <button type='button' className='btn btn-primary'onClick={this.addVarient}>
                                    Add Varients
                                </button>
                                <ReactDataTable
                                    // config={this.config}
                                    // records={this.state.records}
                                    // columns={this.columns}
                                    // onPageChange={this.pageChange.bind(this)}
                                ></ReactDataTable>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-subject"
                                    type="submit"
                                    className="btn btn-primary">
                                        Update Varients
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SubjectVarientAddModal.propTypes = {
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
)(withRouter(SubjectVarientAddModal));
