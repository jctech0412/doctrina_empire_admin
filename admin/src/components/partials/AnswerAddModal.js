import React, { Component, Fragment } from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAnswer } from "../../actions/subjectActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import ReactDataTable from '@ashvin27/react-datatable';
import { Input, Select, Button, Checkbox } from 'antd';
const { Option } = Select;

class AnswerAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            id: "",
            answer: "",
            errors: {},
            isvalid: false,
            records: null,
            button: 'Add'
        };
        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Varient",
            no_data_text: 'No Varient found!',
            button: {
                excel: false,
                print: false,
                csv: false
            },
            length_menu: false,
            show_length_menu: false,
            show_filter: false,
            show_pagination :false,
            show_info :true,
            show_first :false,
            show_last :false,
        };
    }

    componentDidMount(){
        this.getAnswer({id: this.state.id});
    }

    getAnswer(id) {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/answers/get`, id)
            .then(res => {
                this.setState({ records: res.data});
                this.tempAnswer = res.data;
            })
            .catch()
    }

    columns = [
        {
            key: "answer",
            text: "Answer",
            className: "content",
            align: "left",
            sortable: true,
        },
        {
            key: "valid",
            text: "Valid",
            className: "content",
            width: 40,
            align: "left",
            sortable: true,
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 100,
            align: "left",
            sortable: false,
            cell: record => {
                return (
                    <Fragment>
                        <button
                            data-toggle="modal"
                            data-target="#update-subject-modal"
                            className="btn btn-primary btn-sm"
                            onClick={() => this.editAnswer(record)}
                            style={{marginRight: '5px'}}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => this.deleteAnswer(record)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                );
            }
        }
    ];

    componentWillReceiveProps(nextProps) {
        this.getAnswer({id: nextProps.record.id});
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id
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
        console.log(document.getElementById("answer").value);
        this.setState({ [e.target.id]: e.target.value });
    };

    record = null;

    onSubjectAdd = e => {
        e.preventDefault();
        this.props.addAnswer([this.state.id ,this.state.records], this.props.history);
        this.setState({
            answer: "",
            records: null,
            valid: "",
        })
    };

    addAnswer = e => {
        if (this.state.button == 'Add') {
            this.props.addAnswer([this.state.id ,{answer: this.state.answer, valid: this.state.isvalid}], this.props.history);
            this.getAnswer({id: this.state.id});
        }else{
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/api/answers/update`, [this.record._id ,{answer: this.state.answer, valid: this.state.isvalid}])
                .then(res => {
                    if (res.status === 200) {
                        this.getAnswer({id: this.state.id});
                        this.setState({ answer: "", valid: false, button: 'Add' });
                        toast(res.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        })
                    }
                })
                .catch();
        }
    }

    deleteAnswer(record) {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/answers/delete`, {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                    this.getAnswer({id: this.state.id});
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
    }

    editAnswer(record) {
        this.record = record;
        console.log(record._id);
        this.setState({ answer: record.answer });
        this.setState({ button: 'Update' })
        if (record.valid == 'true') {
            this.setState({ isvalid: true });
        }else {
            this.setState({ isvalid: false });
        }
    }

    onCheck = (e) => {
        console.log(e.target.checked)
        this.setState({ isvalid: e.target.checked})
    };

    onCancel = e => {
        this.setState({ answer: "", valid: false, button: 'Add' });
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-varient-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Answer</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="row mt-2">
                                    <div className="col-md-10">
                                        <Input 
                                            size="large"
                                            addonAfter={
                                                <Checkbox onChange={this.onCheck} size="large" checked={this.state.isvalid}></Checkbox>}
                                            onChange={this.onChange}
                                            value={this.state.answer}
                                            id="answer"
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <Button type="primary" size="large" onClick={this.addAnswer}>
                                            {this.state.button}
                                        </Button>
                                    </div>
                                </div>
                                <ReactDataTable
                                    config={this.config}
                                    records={this.state.records}
                                    columns={this.columns}
                                ></ReactDataTable>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onCancel}>Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onCancel}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AnswerAddModal.propTypes = {
    addAnswer: PropTypes.func.isRequired,
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
    { addAnswer }
)(withRouter(AnswerAddModal));
