import axios, { AxiosResponse } from "axios";
import { PizzasType } from "../types/type";

export const instance = axios.create({
    baseURL: `http://localhost:3000/`,
})

let data = (param: any) => {
    return param.then((response:AxiosResponse<PizzasType> ) => {
        return response.data;
    });
}

export const API = {
    getPizzaBlocks() { 
        return data(instance.get<PizzasType>(`db.json`))
    }
}
