import { PizzaCard } from '../types/type';
import { BaseThunkType, InferActionTypes } from './store';

let initialState = {
    items: {} as any,
    totalPrice: 0 as any,
    totalCount: 0 as any
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const getTotalPrice = (arr: Array<PizzaCard>) => arr.reduce((sum: number, obj: PizzaCard) => obj.price + sum, 0)

const _get = (obj: any, path: any) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val: string, key: number) => {
      return val[key];
    }, obj[firstKey]);
  };

const getTotalSum = (obj: any, path: string) => {
    return Object.values(obj).reduce((sum, obj) => {
      const value = _get(obj, path);
      return sum + value;
    }, 0);
  };

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
    }else if (action.type === "REMOVE_CARD_PIZZA") {
        const newItems = { 
            ...state.items
        }
        const currentTotalPrice = newItems[action.id].totalPrice
        const currentTotalCount = newItems[action.id].items.length
        delete newItems[action.id]
        return{
            ...state,
            items: newItems,
            totalPrice: state.totalPrice - currentTotalPrice,
            totalCount: state.totalCount - currentTotalCount
        }
    }else if (action.type === "PLUS_PIZZA") {
        const newObjItems = [
            ...state.items[action.payload].items,
            state.items[action.payload].items[0],
          ];
          const newItems = {
            ...state.items,
            [action.payload]: {
              items: newObjItems,
              totalPrice: getTotalPrice(newObjItems),
            },
          };
    
          const totalCount = getTotalSum(newItems, 'items.length');
          const totalPrice = getTotalSum(newItems, 'totalPrice');
    
          return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
          };
    } else if (action.type === "MINUS_PIZZA") {
        const oldItems = state.items[action.payload].items;
        const newObjItems =
            oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
        const newItems = {
            ...state.items,
            [action.payload]: {
            items: newObjItems,
            totalPrice: getTotalPrice(newObjItems),
            },
        };

        const totalCount = getTotalSum(newItems, 'items.length');
        const totalPrice = getTotalSum(newItems, 'totalPrice');

        return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
        };
    }
    return state;
}

export let actions = {
    clearCardAC: () => ({type: "CLEAR_CARD"} as const) ,
    addPizzaToCardAC: (pizza: PizzaCard) => ({type: "ADD_PIZZA_TO_CARD", pizza} as const) ,
    removeCardPizzaAC: (id: number) => ({type: "REMOVE_CARD_PIZZA", id} as const) ,
    plusPizzaAC: ( payload: number) => ({type: "PLUS_PIZZA", payload} as const) ,
    minusPizzaAC: ( payload: number) => ({type: "MINUS_PIZZA", payload} as const) ,
}

// thunk

export let addPizzaToCards = (obj: PizzaCard): ThunkType => async (dispatch) => {
    dispatch(actions.addPizzaToCardAC(obj))
}
export let clearCard = (): ThunkType => async (dispatch) => {
    dispatch(actions.clearCardAC())
}
export let removeCardPizza = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.removeCardPizzaAC(id))
}
export let plusPizza = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.plusPizzaAC(id))
}
export let minusPizza = (id: number): ThunkType => async (dispatch) => {
    dispatch(actions.minusPizzaAC(id))
}

export default cardReducer; 