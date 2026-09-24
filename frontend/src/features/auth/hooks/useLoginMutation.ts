import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeLoginSchema } from "../schemes";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export function useLoginMutation(
  setIsShowFactor: Dispatch<SetStateAction<boolean>>
) {
    const router = useRouter()

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeLoginSchema;
      recaptcha: string;
    }) => authService.login(values, recaptcha),
    onSuccess(data: any) {
        if(data.message) {
            toastMessageHandler(data)
            setIsShowFactor(true)
        } else {
            toast.success('Успешная авторизация')
            router.push('/dashboard/settings')
        }
    },
    onError(error) {
        console.log('🔴 login ERROR:', error)

      toastMessageHandler(error);
    },
  });

  return { login, isLoadingLogin };
}
