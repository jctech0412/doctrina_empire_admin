import axios from 'axios';

import {
    ADD_STUDENT,
    STUDENT_UPDATE,
    STUDENT_LOADING,
    GET_ERRORS,
    UPDATE_STATUS
} from './types';

// Get current profile

export const addStudent = (studentData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/students/add`, studentData)
        .then(res => dispatch({
            type: ADD_STUDENT,
            payload: res,
        }))
        .catch(err => {if (err){
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data  
            })
        }}
            
        );
}
export const updateStudent = (studentData) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/students/update`, studentData)
        .then(res =>
            dispatch({
                type: STUDENT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const setStudentLoading = () => {
    return {
        type: STUDENT_LOADING
    };
};