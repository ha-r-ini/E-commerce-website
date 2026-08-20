export const FilterReducer = (state, action) =>{

    switch(action.type) {
        case "SET_RATING":
            return {
                ...state,
                rating: action.payload,
            }
        case "SET_BESTSELLER":
            return {
                ...state,
                best_seller: action.payload,
            }  
        case "SET_INSTOCK":
            return {
                ...state,
                in_stock: action.payload
            }  
        case "SET_SORT":
            return {
                ...state,
                sort: action.payload
            } 
        case "CLEAR_FILTER":
            return {
                rating:0,
                best_seller:false,
                in_stock:false,
                sort:""
            }     
            
        default:
            return state;   
    }
        
}