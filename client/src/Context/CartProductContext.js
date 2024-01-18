import React, { createContext, useEffect, useState } from 'react'


export const CartProductContext = createContext();

const CartProductProvider = ({ children }) => {

    const [cartItem, setCartItem] = useState([]);
    const [update, setUpdate] = useState(false);
    const [price, setPrice] = useState(0);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const localProducts = JSON.parse(localStorage.getItem("cartItem"));
        if (localProducts) {
            setCartItem(localProducts);
            setFlag(true);
        }
        else return;
        
    }, []);

    if (update) {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
        setUpdate(false);
        setFlag(true);
    }

    if (flag) {
        setPrice(0);
        cartItem.forEach((value) => {
            setPrice((prevPrice) => prevPrice + ((value.item.price) * value.quantity))
        })
        setFlag(false);
    }

    return (
        <CartProductContext.Provider value={{ cartItem, setCartItem, setUpdate, price, setPrice, setFlag, flag }}>
            {children}
        </CartProductContext.Provider>
    )
}

export default CartProductProvider
