import { ToastType } from "@/components/shared";
import { setToast } from "@/redux/slices/toastSlice";
import { Response } from "@/service/index.types";
import { HandleAsyncArgs, handleAsync } from "@/utils/async-handler";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useHandleAsync = <T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  props: Omit<
    HandleAsyncArgs<Response<Awaited<ReturnType<T>>>>,
    "loadingCallback" | "toast"
  > = {},
) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToast = (toastData: ToastType) => {
    dispatch(setToast(toastData));
  };

  const fn = handleAsync(asyncFn, {
    ...(props || {}),
    loadingCallback: setIsLoading,
    toast: handleToast,
  });

  return [fn, isLoading] as const;
};
