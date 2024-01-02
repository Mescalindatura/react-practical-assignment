import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import postsSlicer from "../features/PostsSlicer";

export const store = configureStore({
  reducer: {
    slicer: postsSlicer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
