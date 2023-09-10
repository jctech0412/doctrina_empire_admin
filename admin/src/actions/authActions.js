import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOGOUT,
    USER_LOADING
} from "./types";

export const loginUser = userData => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch({
                type: SET_CURRENT_USER,
                params: decoded
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                params: err.response.data
            })
        );
};

// const url = process.env.REACT_APP_BACKEND_URL;
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        params: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch({
        type: USER_LOGOUT
    });
};
