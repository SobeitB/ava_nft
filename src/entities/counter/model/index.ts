import { createSlice } from '@reduxjs/toolkit'

const initialState:{counter:number} = {
   counter:0
}

export const counterSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      increment: (state) => {
         if(state.counter < 2) {
            state.counter = state.counter + 1;
         }
      },

      decrement: (state) => {
         if(state.counter > 0) {
            state.counter = state.counter - 1;
         }
      },
   },
})

export const {
   increment,
   decrement
} = counterSlice.actions

export default counterSlice.reducer