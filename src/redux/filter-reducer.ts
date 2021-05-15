import { BaseThunkType, InferActionTypes } from './store';
import { Dispatch } from 'redux';
import { API } from '../api/api';
import {PizzasType, PizzaType, SortPopupItem } from '../types/type';

let initialState = {
    category: null as null | number,
    sortBy: {
        type: 'popular',
        order: 'desc',
    },
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


const filterReducer = (state = initialState, action: ActionsType): InitialStateType => {
     if (action.type === "SET_CATEGORITES") {
        return{
            ...state,
            category: action.category
        }
    } else if (action.type === "SET_SORTBY") {
        return{
            ...state,
            sortBy: action.sort
        }
    }
    return state;
}

export let actions = {
    setSortByAC: (sort: any) => ({type: "SET_SORTBY", sort} as const) ,
    setCategoryAC: (category: number) => ({type: "SET_CATEGORITES", category} as const) 
}

// thunk

export let setFilter = (category: number): ThunkType => async (dispatch) => {
    dispatch(actions.setCategoryAC(category))
}

export default filterReducer; 