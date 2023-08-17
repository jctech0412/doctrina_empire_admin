import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import studentReducers from "./studentReducers";
import subjectReducers from "./subjectReducers";

export default combineReducers({
    subject: subjectReducers,
    student: studentReducers,
    auth: authReducer,
    errors: errorReducer
});