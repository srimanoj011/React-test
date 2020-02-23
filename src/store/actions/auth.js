import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from "../types";
import { CALL_API } from "../api.middleware";
import { replace } from "connected-react-router";

export const signIn = payload => async dispatch => {
    try {
        await dispatch({
            [CALL_API]: {
                url: "/users/login",
                method: "POST",
                body: payload,
                types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILED],
            }
        });
        dispatch(replace("/products"));
    } catch (error) {
        alert(`${error}`);
    }
};

export const logout = (access_token) =>async dispatch => {
        await dispatch({
            [CALL_API]: {
                url: "/users/logout",
                method: "POST",
                types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE],
                params: { access_token },
            }
        });
        dispatch(replace("/login"));
}
