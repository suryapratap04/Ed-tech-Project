import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: [],
  total: 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  totalUniqueItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems(state, value) {
      state.totalItems = value.payload;
    },
    // add to cart function
    // remove cart 
    // reset cart
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
