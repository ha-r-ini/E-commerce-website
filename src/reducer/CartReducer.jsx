export const CartReducer = (state, action) => {

    switch (action.type) {

        case "ADD_TO_CART": {
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id
                            ? {
                                ...item,
                                quantity: item.quantity + action.payload.quantity
                            }
                            : item
                    )
                };
            }

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    action.payload,
                ]
            };
        }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                )
            };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                )
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload && item.quantity > 1
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
            };

        case "CLEAR_CART":
            return {
                ...state,
                cartItems: []
            };

        default:
            return state;
    }
};