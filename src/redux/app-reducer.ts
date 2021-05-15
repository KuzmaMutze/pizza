import { BaseThunkType, InferActionTypes } from './store';
import { Dispatch } from 'redux';
import { API } from '../api/api';
import {PizzasType, PizzaType } from '../types/type';

let initialState = {
    pizzas: [] as Array<PizzaType>,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === "SET_PIZZAS") {
        return {
            ...state,
            pizzas: [...action.pizzas.pizzas]
        }
    }
    return state;
}

export let actions = {
    setPizzasAC: (pizzas: PizzasType) => ({type: "SET_PIZZAS", pizzas} as const) 
}

// thunk
export let getPizza = (): ThunkType => async (dispatch) => {
    let data = await API.getPizzaBlocks()
    console.log(...data.pizzas);
    
    dispatch(actions.setPizzasAC(data))
}

export default appReducer; 