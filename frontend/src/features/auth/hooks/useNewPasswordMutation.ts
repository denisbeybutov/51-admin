import { useMutation } from "@tanstack/react-query";
import { TypeResetPasswordSchema } from "../schemes/reset-password.schema";
import { passwordRecoveryService } from "../services/password-recovery.service";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { TypeNewPasswordSchema } from "../schemes";

import { useRouter,useSearchParams } from "next/navigation";

export function useNewPasswordMutation() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
        mutationKey: ["new password"],
        mutationFn: ({
          values,
          recaptcha,
        }: {
          values: TypeNewPasswordSchema          
          recaptcha: string
        }) => passwordRecoveryService.new(values,token, recaptcha),
        onSuccess() {
            toast.success('Пароль успешно изменен', {
                description: "Теперь вы можете войти в свой аккаунт"
            })
            router.push('/dashboard/settings')
        },
        onError(error) {
            console.log('🔴 login ERROR:', error)
    
          toastMessageHandler(error);
        },
      });
    
      return { newPassword, isLoadingNew };
}