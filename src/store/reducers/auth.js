import { LOGIN_SUCCESS, LOGOUT } from "../types/auth";

const initalState = {
    token: null
};

export default function authReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return { ...state, token: action.body.id };
        }
        case LOGOUT: {
            return { ...initalState };
        }
        default:
            return state;
    }
}
