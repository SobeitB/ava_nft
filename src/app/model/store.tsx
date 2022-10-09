import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import blockChainSlice from './slice/blockChain'
import counterSlice from 'entities/counter/model'

export const store = configureStore({
   reducer: {
      blockChainSlice,
      counterSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
   >;