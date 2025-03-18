import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import taskReducer from "../store/slices/taskSlice";
import timeReducer from "../store/slices/timeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    time: timeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
