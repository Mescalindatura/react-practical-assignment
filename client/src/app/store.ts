import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import uiSlice from "../features/UiSlice";
import modalSlice from "../features/ModalSlice";
import postsSlice from "../features/PageSlice";
import authSlice from "../features/AuthSlice";



export const store = configureStore({
  reducer: {
    users: authSlice,
    posts: postsSlice,
    ui: uiSlice,
    modal: modalSlice,
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
