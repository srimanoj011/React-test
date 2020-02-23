import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { routerMiddleware } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist"
import rootReducer from "./reducers/index"
import thunk from "redux-thunk"
import apiMiddleWare from "./api.middleware"
import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["auth"]
}


const PersistedReducer = persistReducer(persistConfig, rootReducer(history))

const store = createStore(PersistedReducer, applyMiddleware(thunk, apiMiddleWare, routerMiddleware(history)))
export const persistor = persistStore(store)

export default store;




