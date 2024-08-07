import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct, IProducts } from "../../utils/models";

export interface CartState {
  items: ICartProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product?: IProducts; size: string }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.product?.id === action.payload.product?.id &&
          item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: number; size: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.product?.id !== action.payload.productId ||
          item.size !== action.payload.size
      );
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{ productId: number; size: string }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.product?.id === action.payload.productId &&
          item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{ productId: number; size: string }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.product?.id === action.payload.productId &&
          item.size === action.payload.size
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    setCart: (state, action: PayloadAction<ICartProduct[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
