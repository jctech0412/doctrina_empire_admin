import axios from 'axios';

import {
    SUBJECT_ADD,
    SUBJECT_UPDATE,
    ANSWER_ADD,
    GET_ERRORS
} from './types';

// Get current profile

const url = process.env.REACT_APP_BACKEND_URL;
export const addSubject = (subjectData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/subjects/add`, subjectData)
        .then(res => dispatch({
            type: SUBJECT_ADD,
            payload: res,
        }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
}

export const addAnswer = (subjectData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/answers/add`, subjectData)
        .then(res => dispatch({
            type: ANSWER_ADD,
            payload: res,
        }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
}

export const updateSubject = (subjectData) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/subjects/update`, subjectData)
        .then(res =>
            dispatch({
                type: SUBJECT_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

