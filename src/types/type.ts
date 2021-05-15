
export type PizzaType = {
    "id": number,
    "imageUrl": string
    "name": string
    "types": Array<number>
    "sizes": Array<number>
    "price": number
    "category": number
    "rating": number
}

export type PizzasType = { 
    pizzas: Array<PizzaType>
}