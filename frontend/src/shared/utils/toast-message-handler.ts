import {toast} from 'sonner'

export function toastMessageHandler (error: Error) {
    if(error.message) {
        const errorMessage = error.message
        const firstDoIndex = errorMessage.indexOf('.')

        if(firstDoIndex !== -1) {
            toast.error(errorMessage.slice(0, firstDoIndex), {
                description: errorMessage.slice(firstDoIndex + 1)
            })
        } else {
            toast.error(errorMessage)
        }
    } else {
        toast.error('Ошибка со стороны сервера')
    }
}