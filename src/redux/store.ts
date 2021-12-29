import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;