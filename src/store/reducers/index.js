import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import authReducer from "./auth"
import productsReducer from "./products"




export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    product: productsReducer
})