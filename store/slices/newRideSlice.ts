import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  place: null,
  date: null,
  car: null,
  price: null,
};

const newRideSlice = createSlice({
  name: "newRideSlice",

  initialState,

  reducers: {
    setPlace(state, actions) {
      state.place = actions.payload;
    },
    setDate(state, actions) {
      state.date = new Date(actions.payload).toISOString();
    },
    setCar(state, actions) {
      state.car = actions.payload;
    },
    setPrice(state, actions) {
      state.price = actions.payload;
    },
    clearRide(state) {
      state.place = null;
      state.date = null;
      state.car = null;
      state.price = null;
    }
  },
});

export default newRideSlice.reducer;
export const { 
  setPlace,
  setDate,
  setCar,
  setPrice,
  clearRide,
} = newRideSlice.actions;