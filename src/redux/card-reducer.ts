import { PizzaCard } from '../types/type';
import { BaseThunkType, InferActionTypes } from './store';

let initialState = {
    items: {} as any,
    totalPrice: 0,
    totalCount: 0
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


const cardReducer = (state = initialState, action: ActionsType): InitialStateType => {
     if (action.type === "ADD_PIZZA_TO_CARD") {
        let newItems = {
            ...state.items,
            [action.pizza.id]: !state.items[action.pizza.id]
            ? [action.pizza]
            : [...state.items[action.pizza.id], action.pizza]
        }

        const allPizzas = [].concat.apply([], Object.values(newItems))
        const totalPrice = allPizzas.reduce((sum: number, obj: PizzaCard) => obj.price + sum, 0)

        return{
            ...state,
            items: newItems,
            totalCount: allPizzas.length,
            totalPrice: totalPrice
        }
    } else
    return state;
}

export let actions = {
    setSortByAC: (payload: number) => ({type: "SET_TOTAL_PRICE", payload} as const) ,
    addPizzaToCardAC: (pizza: PizzaCard) => ({type: "ADD_PIZZA_TO_CARD", pizza} as const) ,
}

// thunk

export let addPizzaToCards = (obj: PizzaCard): ThunkType => async (dispatch) => {
    dispatch(actions.addPizzaToCardAC(obj))
}


export default cardReducer; 