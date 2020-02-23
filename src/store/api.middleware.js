import { STOP_LOADING, START_LOADING } from "./types";
import { replace } from "connected-react-router"

export const BASE_URL = "http://localhost:3000/api";
const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

async function invokeAPI(endpoint, token, config) {
        const headers = { ...DEFAULT_HEADERS };
        const updatedConfig = { ...config, headers };
        const response = await fetch(BASE_URL + endpoint, updatedConfig);
        const body = await response.json();
        if (response.status >= 400) {
            throw new Error("Something went wrong");
        }
        return body;
}

export const CALL_API = Symbol("Call Api")

export default store => next => async action => {
    if (typeof action[CALL_API] == "undefined") {
        return next(action)
    }
    let {
        url,
        method,
        types = [],
        showLoader = false,
        body = undefined,
        params,
        data = {}
    } = action[CALL_API];
    const [requestType, successType] = types;
    const { auth } = store.getState();
    requestType && next({ type: requestType });
    try {
        if (showLoader) {
            next({ type: START_LOADING });
        }
        const queryParams = new URLSearchParams();
        for (let param in params) {
            if (params[param]) {
                queryParams.set(param, params[param]);
            }
        }

        const responseBody = await invokeAPI(
            url + "?" + queryParams.toString(),
            auth.token,
            { method, body: JSON.stringify(body) }
        );
        successType &&
            next({
                body: responseBody,
                type: successType,
                data
            });
        return responseBody;
    } catch (error) {
        throw error.message;
    } finally {
        if (showLoader) {
            next({ type: STOP_LOADING });
        }
    }

}