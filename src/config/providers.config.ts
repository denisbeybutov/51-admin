import { ConfigService } from '@nestjs/config'

import { TypeOptions } from '@/auth/provider/provider.constants'
import { GoogleProvider } from '@/auth/provider/services/google.provider'
import { YandexProvider } from '@/auth/provider/services/yandex.provider'

/**
 * Конфигурация для провайдеров OAuth.
 *
 * Эта функция асинхронно извлекает параметры конфигурации из ConfigService
 * и формирует объект конфигурации для OAuth провайдеров.
 *
 * @param configService - Сервис для работы с конфигурацией приложения.
 * @returns Объект конфигурации для провайдеров OAuth.
 */
export const getProvidersConfig = async (
	configService: ConfigService
): Promise<TypeOptions> => {
	const services = []

	// Добавляем Google Provider только если указаны credentials
	const googleClientId = configService.get<string>('GOOGLE_CLIENT_ID')
	const googleClientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET')
	if (googleClientId && googleClientSecret) {
		services.push(
			new GoogleProvider({
				client_id: googleClientId,
				client_secret: googleClientSecret,
				scopes: ['email', 'profile']
			})
		)
	}

	// Добавляем Yandex Provider только если указаны credentials
	const yandexClientId = configService.get<string>('YANDEX_CLIENT_ID')
	const yandexClientSecret = configService.get<string>('YANDEX_CLIENT_SECRET')
	if (yandexClientId && yandexClientSecret) {
		services.push(
			new YandexProvider({
				client_id: yandexClientId,
				client_secret: yandexClientSecret,
				scopes: ['login:email', 'login:avatar', 'login:info']
			})
		)
	}

	return {
		baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
		services
	}
}
