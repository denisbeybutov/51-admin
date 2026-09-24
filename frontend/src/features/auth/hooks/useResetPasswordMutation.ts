import { useMutation } from "@tanstack/react-query";
import { TypeResetPasswordSchema } from "../schemes/reset-password.schema";
import { passwordRecoveryService } from "../services/password-recovery.service";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";

export function useResetPasswordMutation() {
    const { mutate: reset, isPending: isLoadingReset } = useMutation({
        mutationKey: ["reset password"],
        mutationFn: ({
          values,
          recaptcha,
        }: {
          values: TypeResetPasswordSchema;
          recaptcha: string;
        }) => passwordRecoveryService.reset(values, recaptcha),
        onSuccess() {
            toast.success('Проверьте почту', {
                description: "на вашу почту была отправлены ссылка для подтверждения"
            })
        },
        onError(error) {
            console.log('🔴 login ERROR:', error)
    
          toastMessageHandler(error);
        },
      });
    
      return { reset, isLoadingReset };
}