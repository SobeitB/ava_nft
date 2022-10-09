import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {blockChainState} from "../../../../shared/config/type";

const initialState:blockChainState = {
   address: '0x',
   balance:0,
   provider:null,
   contract:null,
   signer:null,
   txBeingSent:false,
   error:false,
   status:0,
   totalSupply:0,
}

export const blockChainSlice = createSlice({
   name: 'blockChain',
   initialState,
   reducers: {
      setFullSettings: (state, action: PayloadAction<blockChainState>) => {

         for (let key in action.payload) {
            // @ts-ignore
            state[key] = action.payload[key];
         }
      },

      setBalance: (state, action: PayloadAction<number>) => {
         state.balance = action.payload;
      },

      setTxBeingSent: (state, action: PayloadAction<boolean>) => {
         state.txBeingSent = action.payload;
      },

      setError: (state, action: PayloadAction<string>) => {
         state.error = action.payload;
      },
   },
})

export const {
   setFullSettings,
   setBalance,
   setTxBeingSent,
   setError
} = blockChainSlice.actions

export default blockChainSlice.reducer