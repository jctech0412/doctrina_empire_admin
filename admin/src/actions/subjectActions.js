import axios from 'axios';

import {
    SUBJECT_ADD,
    SUBJECT_UPDATE,
    GET_ERRORS
} from './types';

// Get current profile

export const addSubject = (subjectData, history) => dispatch => {
    axios
        .post("/api/subjects/add", subjectData)
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

export const updateSubject = (subjectData) => dispatch => {
    console.log(subjectData)
    axios
        .post("/api/subjects/update", subjectData)
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

