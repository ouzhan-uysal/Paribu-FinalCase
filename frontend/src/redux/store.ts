import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import todoSlice from "redux/features/todoSlice";

const store = configureStore({
  reducer: {
    // slice'Lardan gelen reducer'ları burada tanımla
    todos: todoSlice,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>; // Reducer içine girdiğimiz slice'Ların type'Larını otomatik slice'tan alıp döndürüyor.

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
