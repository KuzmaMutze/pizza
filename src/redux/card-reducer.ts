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

const getTotalPrice = (arr: any) => arr.reduce((sum: number, obj: PizzaCard) => obj.price + sum, 0)

const cardReducer = (state = initialState, action: ActionsType): InitialStateType => {
     if (action.type === "ADD_PIZZA_TO_CARD") {
        let currentPizzaItems = !state.items[action.pizza.id]
        ? [action.pizza]
        : [...state.items[action.pizza.id].items, action.pizza]

        let newItems = {
            ...state.items,
            [action.pizza.id]: {
                items: currentPizzaItems,
                totalPrice: getTotalPrice(currentPizzaItems)
            }
        }

        const items = Object.values(newItems).map((obj: any) => obj.items)
        const allPizzas = [].concat.apply([], items)
        const totalPrice = getTotalPrice(allPizzas)

        return{
            ...state,
            items: newItems,
            totalCount: allPizzas.length,
            totalPrice: totalPrice
        }
    } else if (action.type === "CLEAR_CARD") {
        return{
            ...state,
            items: {},
            totalPrice: 0,
            totalCount: 0
        }
    }
    return state;
}

export let actions = {
    clearCardAC: () => ({type: "CLEAR_CARD"} as const) ,
    addPizzaToCardAC: (pizza: PizzaCard) => ({type: "ADD_PIZZA_TO_CARD", pizza} as const) ,
}

// thunk

export let addPizzaToCards = (obj: PizzaCard): ThunkType => async (dispatch) => {
    dispatch(actions.addPizzaToCardAC(obj))
}

export let clearCard = (): ThunkType => async (dispatch) => {
    dispatch(actions.clearCardAC())
}

export default cardReducer; 