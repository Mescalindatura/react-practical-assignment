import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import modalSlice from "../features/ModalSlice";
import authSlice from "../features/AuthSlice";
import pageSlice from "../features/PageSlice";



export const store = configureStore({
  reducer: {
    users: authSlice,
    modal: modalSlice,
    page: pageSlice
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
