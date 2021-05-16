import { BaseThunkType, InferActionTypes } from './store';
import { API } from '../api/api';
import { PizzasType, PizzaType } from '../types/type';

let initialState = {
    pizzas: [] as any,
    isLoaded: false as boolean
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === "SET_PIZZAS") {
        return {
            ...state,
            pizzas: action.pizzas,
        }
    } else if (action.type === "SET_IS_LOADED") {
        return {
            ...state,
            isLoaded: action.bool
        }
    } 
    else return state;
}

export let actions = {
    setPizzasAC: (pizzas: PizzaType) => ({type: "SET_PIZZAS", pizzas} as const) ,
    setIsLoaded: (bool: boolean) => ({type: "SET_IS_LOADED", bool} as const) ,
}

// thunk
export let getPizza = (category?: number | null, sortBy?: string): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoaded(true))
    let data = await API.getPizzaBlocks(category, sortBy)
    dispatch(actions.setPizzasAC(data))
    dispatch(actions.setIsLoaded(false))
}

export default appReducer; 