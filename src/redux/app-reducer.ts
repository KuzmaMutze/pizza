import { BaseThunkType, InferActionTypes } from './store';
import { API } from '../api/api';
import { PizzasType, PizzaType } from '../types/type';

let initialState = {
    pizzas: [] as any
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    if (action.type === "SET_PIZZAS") {
        return {
            ...state,
            pizzas: action.pizzas
        }
    } else return state;
}

export let actions = {
    setPizzasAC: (pizzas: PizzaType) => ({type: "SET_PIZZAS", pizzas} as const) ,
}

// thunk
export let getPizza = (): ThunkType => async (dispatch) => {
    let data = await API.getPizzaBlocks()
    dispatch(actions.setPizzasAC(data))
}

export default appReducer; 