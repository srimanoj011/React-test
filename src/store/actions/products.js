import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    NEW_PRODUCTS,
    NEW_PRODUCTS_SUCCESS,
    NEW_PRODUCTS_FAILURE,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SELECT_PRODUCT,
    SELECT_PRODUCT_SUCCESS,
    SELECT_PRODUCT_FAILURE
} from "../types";
import { CALL_API } from "../api.middleware";

export const getProducts = access_token => async dispatch => {
    try {
        return await dispatch({
            [CALL_API]: {
                url: "/Products",
                method: "GET",
                types: [GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE],
                params: { access_token },
            }
        });
    } catch (error) {
        alert(`${error}`);
    }
};


export const createNewProduct = (access_token, body) => async dispatch => {
    try {
        return await dispatch({
            [CALL_API]: {
                url: "/Products",
                method: "POST",
                types: [NEW_PRODUCTS, NEW_PRODUCTS_SUCCESS, NEW_PRODUCTS_FAILURE],
                body,
                params: { access_token },
            }
        });
    } catch (error) {
        alert(`${error}`);
    }
};

export const editProduct = (access_token, id, body) => async dispatch => {
    try {
        return await dispatch({
            [CALL_API]: {
                url: `/Products/${id}`,
                method: "PUT",
                types: [EDIT_PRODUCT, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAILURE],
                body,
                params: { access_token },
            }
        });
    } catch (error) {
        alert(`${error}`);
    }
};

export const deleteProduct = (access_token, id) => async dispatch => {
    try {
        return await dispatch({
            [CALL_API]: {
                url: `/Products/${id}`,
                method: "DELETE",
                types: [DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE],
                params: { access_token },
                data: { id }
            }
        });
    } catch (error) {
        alert(`${error}`);
    }
};

export const selectProduct = (access_token, id) => async dispatch => {
    try {
        return await dispatch({
            [CALL_API]: {
                url: `/Products/${id}`,
                method: "GET",
                types: [SELECT_PRODUCT, SELECT_PRODUCT_SUCCESS, SELECT_PRODUCT_FAILURE],
                params: { access_token },
                data: { id }
            }
        });
    } catch (error) {
        alert(`${error}`);
    }
};

