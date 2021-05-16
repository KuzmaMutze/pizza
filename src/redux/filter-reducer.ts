import { BaseThunkType, InferActionTypes } from './store';

let initialState = {
    category: null as null | number,
    sortBy: 'popular'
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
    setSortByAC: (sort: string) => ({type: "SET_SORTBY", sort} as const) ,
    setCategoryAC: (category: number | null) => ({type: "SET_CATEGORITES", category} as const) 
}

// thunk

export let setCategory = (category: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.setCategoryAC(category))
}
export let setSortBy = (sort: string): ThunkType => async (dispatch) => {
    dispatch(actions.setSortByAC(sort))
}

export default filterReducer; 