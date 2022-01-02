import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

(window as any).store = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;