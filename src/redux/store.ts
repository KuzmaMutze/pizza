import {applyMiddleware, combineReducers, createStore, compose, Action} from "redux";
import aapReducer from "./app-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import filterReducer from "./filter-reducer";
import cardReducer from "./card-reducer";

let rootReducers = combineReducers({
    app: aapReducer,
    filter: filterReducer,
    card: cardReducer
});

type RootReducerType = typeof rootReducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// types
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;


export default store; 