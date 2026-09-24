import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeRegisterSchema } from "../schemes";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";

export function useRegisterMutation() {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ["register user"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeRegisterSchema;
      recaptcha: string;
    }) => authService.register(values, recaptcha),
    onSuccess(data: any) {
       

      toastMessageHandler(data)
    },
    onError(error) {
        console.log('🔴 REGISTER ERROR:', error)

      toastMessageHandler(error);
    },
  });

  return { register, isLoadingRegister };
}
