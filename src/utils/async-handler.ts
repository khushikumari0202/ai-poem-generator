import { ToastType } from "@/components/shared";
import { Response } from "@/service/index.types";
import { CustomError } from "./common.utils";

export type HandleAsyncArgs<T> = {
  loadingCallback?: (status: boolean) => void;
  strictlyThrowError?: boolean;
  toast?: (args: ToastType) => void;
  successMessage?: string;
  errorMessage?: string;
  shouldHideErrorToast?: boolean;
  onSuccess?: (data?: T) => void;
};

export const handleAsync =
  <T extends (...args: any[]) => Promise<Response<any>>>(
    asyncFn: T,
    {
      loadingCallback,
      strictlyThrowError = true,
      toast,
      errorMessage,
      successMessage,
      shouldHideErrorToast = false,
      onSuccess = () => {},
    }: HandleAsyncArgs<Response<Awaited<ReturnType<T>>>>,
  ) =>
  async (
    ...args: Parameters<T>
  ): Promise<Response<Awaited<ReturnType<T>>["data"]>> => {
    try {
      loadingCallback?.(true);
      const res = await asyncFn(...args);

      if (strictlyThrowError && res?.error) {
        throw res?.error;
      }

      if (successMessage && toast) {
        toast({ type: "SUCCESS", message: successMessage });
      }
      onSuccess?.(res);
      loadingCallback?.(false);
      return res;
    } catch (err) {
      console.error("Error:", err);

      const status = (err as CustomError)?.status || 500;
      const message = (err as CustomError)?.message;
      const code = (err as CustomError)?.code;

      if (!shouldHideErrorToast && toast && (errorMessage || code || message)) {
        toast({
          type: "ERROR",
          message: errorMessage || message,
        });
      }

      const error =
        err instanceof Error
          ? err
          : new CustomError(`Unknown error: ${String(err)}`);

      loadingCallback?.(false);
      return { error, status, data: null, message: message || "Unknown error" };
    }
  };
