import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'

import { isDev } from '@/libs/common/utils/is-dev.util'

/**
 * Конфигурация для Google reCAPTCHA.
 *
 * Эта функция асинхронно извлекает параметры конфигурации из ConfigService
 * и формирует объект конфигурации для модуля Google reCAPTCHA.
 *
 * @param configService - Сервис для работы с конфигурацией приложения.
 * @returns Объект конфигурации для Google reCAPTCHA.
 */
export const getRecaptchaConfig = async (
	configService: ConfigService
): Promise<GoogleRecaptchaModuleOptions> => {
	const isDevMode = isDev(configService)
	const secretKey = configService.get<string>('GOOGLE_RECAPTCHA_SECRET_KEY', 'dev-secret-key')

	return {
		secretKey,
		response: req => req.headers.recaptcha,
		skipIf: isDevMode
	}
}
