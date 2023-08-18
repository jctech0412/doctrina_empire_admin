import {
    ADD_STUDENT,
    GET_STUDENTS,
    STUDENT_UPDATE,
    DELETE_STUDENT,
    STUDENT_LOADING,
    UPDATE_STATUS
  } from '../actions/types';
  
  const initialState = {
    student: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case STUDENT_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_STUDENTS:
        return {
          ...state,
          students: action.payload,
          loading: false
        };
      case ADD_STUDENT:
        return {
          ...state,
          students: action.payload
        };
      case STUDENT_UPDATE:
        return {
          ...state,
          students: action.payload
        };
      case DELETE_STUDENT:
        return {
          ...state,
          students: state.students.filter(student => student._id !== action.payload)
        };
      case UPDATE_STATUS:
        return{
          ...state,
          students: action.payload
        }
      default:
        return state;
    }
  }
  