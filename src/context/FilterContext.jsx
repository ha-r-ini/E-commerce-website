import { createContext, useReducer } from "react";
import { FilterReducer } from "../reducer/FilterReducer";


export const FilterContext = createContext()

const initialState = {
    rating: 0,
    best_seller: false,
    in_stock: false,
    sort:""
}

export const FilterProvider = ({ children }) => {
    const [filter, dispatch] = useReducer(FilterReducer, initialState)

    return (
        <FilterContext.Provider value={{ filter, dispatch }}>
            {children}
        </FilterContext.Provider>
    )
}