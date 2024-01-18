import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk('cart/add', async (item) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const foundItem = currentCart.filter((i) => i._id === item._id);
    if (foundItem.length > 0) {
        throw Error('Item Already Present In Cart');
    }
    else {
        currentCart.push(item);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        return currentCart;
    }
});

export const updateCartItem = createAsyncThunk('cart/update', async (item) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = currentCart.findIndex((cartItem) => cartItem._id === item._id);
    currentCart[index] = item;
    localStorage.setItem('cart', JSON.stringify(currentCart));
    return currentCart;
});

export const deleteCartItem = createAsyncThunk('cart/delete', async (item) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const filteredItems = currentCart.filter((localItem) => localItem._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(filteredItems));
    return filteredItems;
})
export const emptyCart = createAsyncThunk('cart/remove', async () => {
    const cartItems = [];
    return cartItems;
})
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(emptyCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(emptyCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;

