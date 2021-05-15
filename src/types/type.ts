
export type PizzaType = {
    id: number,
    imageUrl: string
    name: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

export type PizzasType = { 
    pizzas: Array<PizzaType>
}

export type PizzaCart = {
    pizza: PizzaType
    isActiveSize: number
    isActiveType: number
}

export type SortPopupItem = {
    name: string
    type: string
}