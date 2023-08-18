import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import StudentAddModal from "../partials/StudentAddModal";
import StudentUpdateModal from "../partials/StudentUpdateModal";
import { toast, ToastContainer} from "react-toastify";

class Students extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "first_name",
                text: "Firstname",
                className: "first_name",
                align: "left",
                sortable: true,
            },
            {
                key: "last_name",
                text: "Lastname",
                className: "last_name",
                align: "left",
                sortable: true,
            },
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "left",
                sortable: true
            },
            {
                key: "date",
                text: "Date",
                className: "date",
                align: "left",
                sortable: true
            },
            {
                key: "active",
                text: "status",
                className: "action",
                width: 90,
                align: "left",
                sortable: false,
                cell: record => {
                    
                    if(record.active)
                        return(
                            <Fragment>
                                <button 
                                    className="btn btn-primary "
                                    onClick={() => this.activeUpdate(record)}
                                    style={{width: 90}}
                                >
                                    Enable
                                </button>
                            </Fragment>
                        )
                    else return(
                        <Fragment>
                            <button 
                                className="btn btn-disable "
                                style={{width: 90}}
                                onClick={() => this.activeUpdate(record)}
                            >
                                Disable
                            </button>
                        </Fragment>
                    )
                }
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
                                data-target="#update-student-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Student",
            no_data_text: 'No student found!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                first_name: '',
                email: '',
                last_name: '',
                active: ''
            }
        };

        this.getData = this.getData.bind(this);
    }
    
    activeUpdate = (record) => {
        axios
            .post( `${process.env.REACT_APP_BACKEND_URL}/api/students/updateStatus`, {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })           
                this.getData();
                }
            })
            .catch();

    }
    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/students/get`)
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record});
    }

    deleteRecord(record) {
        axios
            .post( `${process.env.REACT_APP_BACKEND_URL}/api/students/delete`, {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <StudentAddModal/>
                    <StudentUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <div className="button-bottom">
                                <button className="btn btn-link mt-3" id="menu-toggle">
                                    <FontAwesomeIcon icon={faList}/>
                                </button>
                                <button 
                                    className="btn btn-outline-primary float-right mt-3 mr-2" 
                                    data-toggle="modal" 
                                    data-target="#add-student-modal"
                                >
                                    <FontAwesomeIcon icon={faPlus}/> Add Student
                                </button>
                            </div>
                            <h1 className="mt-2 text-primary">Students List</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Students.propTypes = {
    student: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    student: state.student,
    records: state.records
});

export default connect(
    mapStateToProps
)(Students);
