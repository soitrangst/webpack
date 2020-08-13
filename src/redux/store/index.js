import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = () => {
    const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
        )
    )
    sagaMiddleware.run(rootSaga)
    return store
}
export default configureStore