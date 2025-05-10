import { ToastType } from "@/components/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: null as ToastType | null,
  reducers: {
    setToast(state, action: PayloadAction<ToastType | null>) {
      return action.payload ?? null;
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
