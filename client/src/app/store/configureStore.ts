import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { courseMatchSlice } from "../../features/courseMatch/courseMatchSlice";
import { courseSlice } from "../../features/courses/courseSlice";
import { studentSlice } from "../../features/student/studentSlice";


// export function configureStore() {
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        student: studentSlice.reducer,
        course: courseSlice.reducer,
        courseMatch: courseMatchSlice.reducer,
        account: accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;