import {
    SUBJECT_ADD,
    SUBJECT_LOADING,
    SUBJECT_UPDATE
} from "../actions/types";
const initialState = {
    subject: {},
    loading: false,
};
export default function(state = initialState, action) {
    switch (action.type) {
        case SUBJECT_ADD:
            return {
                ...state,
                subjects: action.payload
            };
        case SUBJECT_UPDATE:
            return {
                ...state,
                subjects: action.payload
            };
        case SUBJECT_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
