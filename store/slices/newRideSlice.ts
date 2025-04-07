import { createSlice } from "@reduxjs/toolkit";

const newRideSlice = createSlice({
  name: "newRideSlice",

  initialState: {
    place: null,
    date: null,
    car: null,
    price: null,
  },

  reducers: {
    setPlace(state, actions) {
      state.place = actions.payload;
    },
    setDate(state, actions) {
      state.date = actions.payload;
    },
    setCar(state, actions) {
      state.car = actions.payload;
    },
    setPrice(state, actions) {
      state.price = actions.payload;
    },
  },
});

export default newRideSlice.reducer;
export const { 
  setPlace,
  setDate,
  setCar,
  setPrice,
} = newRideSlice.actions;