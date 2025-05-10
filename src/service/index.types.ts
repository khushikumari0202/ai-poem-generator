import { CustomError } from "@/utils/common.utils";

export type Response<T = unknown> = {
  status: number;
  data: T | null;
  message?: string;
  error?: CustomError | null;
};
