import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { color } from "@/constants/color";
import { setToast } from "@/redux/slices/toastSlice";

export type ToastType = {
  type: "LOADING" | "SUCCESS" | "ERROR";
  message?: string;
};

const style = {
  positiveToast: {
    borderRadius: "10px",
    background: color.success,
    color: color.white,
  },
  negativeToast: {
    borderRadius: "10px",
    background: color.error,
    color: color.white,
  },
};

let toastId: string;
const notify = (type: string, message: string) => {
  toast.remove();
  switch (type) {
    case "LOADING":
      toastId = toast.loading(message ?? "Loading...");
      break;
    case "SUCCESS":
      toast.success(message, {
        id: toastId ?? "",
        style: style.positiveToast,
        iconTheme: {
          primary: "#fff",
          secondary: "#039855",
        },
        duration: 4000,
      });
      break;
    case "ERROR":
      toast.error(message, {
        id: toastId ?? "",
        style: style.negativeToast,
        iconTheme: {
          primary: "#fff",
          secondary: "#D92D20",
        },
        duration: 4000,
      });
      break;
    default:
      break;
  }
};

export const ToastProvider = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: any) => state.toast);

  useEffect(() => {
    if (toast) {
      dispatch(setToast(null));
      notify(toast?.type, toast?.message);
    }
  }, [toast]);

  return <Toaster position="top-center" reverseOrder={false} gutter={8} />;
};
