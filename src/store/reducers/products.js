import { } from "../types/auth";
import { GET_PRODUCTS_SUCCESS, NEW_PRODUCTS_SUCCESS, EDIT_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS } from "../types";

const initalState = {
    products: [],
    productsCount: 0
};

export default function productsReducer(state = initalState, action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS: {
            return { ...state, products: action.body, productsCount: action.body.length };
        }
        case NEW_PRODUCTS_SUCCESS: {
            return { ...state, products: [...state.products, { ...action.body }], productsCount: state.productsCount + 1 }
        }
        case EDIT_PRODUCT_SUCCESS: {
            const response = action.body
            return {
                ...state, products: state.products.map((product) => {
                    if (product.id === response.id) {
                        return response
                    }
                    return product
                })
            }
        }
        case DELETE_PRODUCT_SUCCESS: {
            const { id } = action.data
            const { products, productsCount } = state
            const index = products.findIndex((product) => product.id === id)
            return { ...state, products: products.slice(0, index).concat(products.slice(index + 1, products.length)), productsCount: productsCount - 1 }
        }
        default:
            return state;
    }
}
