import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from '../reducer/CartReducer'

const CartContext = createContext();

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
const initialState = {
    cartItems: savedCart
};

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        CartReducer,
        initialState
    );

    useEffect(() => {
        localStorage.setItem(
            "cartItems",
            JSON.stringify(state.cartItems)
        );
    }, [state.cartItems]);

    const addToCart = (product, quantity) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...product,
                quantity
            }
        });
    };

    const removeFromCart = (id) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: id
        });
    };

    const increaseQuantity = (id) => {
        dispatch({
            type: "INCREASE_QUANTITY",
            payload: id
        });
    };

    const decreaseQuantity = (id) => {
        dispatch({
            type: "DECREASE_QUANTITY",
            payload: id
        });
    };

    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART"
        });
    };

    const total = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};