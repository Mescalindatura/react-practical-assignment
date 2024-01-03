import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import postsSlicer from "../features/PostsSlicer";
import userSlicer from "../features/UserSlicer";
import uiSlicer from "../features/UiSlicer";

export const store = configureStore({
  reducer: {
    users: userSlicer.reducer,
    posts: postsSlicer.reducer,
    ui: uiSlicer.reducer
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
