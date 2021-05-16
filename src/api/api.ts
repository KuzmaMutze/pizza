import axios, { AxiosResponse } from "axios";
import { PizzasType } from "../types/type";

export const instance = axios.create({
    baseURL: `http://localhost:3001/`,
})

let data = (param: any) => {
    return param.then((response:AxiosResponse<PizzasType> ) => {
        return response.data;
    });
}

export const API = {
    getPizzaBlocks(category?: number| null, sortBy?: string) { 
        return data(instance.get<PizzasType>(`pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy}&_order=desc`))
    }
}
