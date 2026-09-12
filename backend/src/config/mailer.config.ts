import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import { isDev } from '@/libs/common/utils/is-dev.util'

/**
 * Конфигурация для почтового сервера.
 *
 * Эта функция асинхронно извлекает параметры конфигурации из ConfigService
 * и формирует объект конфигурации для Mailer.
 *
 * @param configService - Сервис для работы с конфигурацией приложения.
 * @returns Объект конфигурации для Mailer.
 */
export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => {
	const mailHost = configService.get<string>('MAIL_HOST', 'smtp.ethereal.email')
	const mailPort = configService.get<number>('MAIL_PORT', 587)
	const mailLogin = configService.get<string>('MAIL_LOGIN', 'test@example.com')
	const mailPassword = configService.get<string>('MAIL_PASSWORD', 'test-password')
	const mailFrom = configService.get<string>('MAIL_FROM', mailLogin)

	return {
		transport: {
			host: mailHost,
			port: mailPort,
			secure: mailPort === 465, // true для SSL (465), false для TLS (587)
			auth: {
				user: mailLogin,
				pass: mailPassword
			},
			// Дополнительные настройки для предотвращения таймаутов
			connectionTimeout: 10000, // 10 секунд
			greetingTimeout: 10000, // 10 секунд
			socketTimeout: 10000, // 10 секунд
			// Для Resend через TLS (порт 587)
			tls: {
				rejectUnauthorized: false
			}
		},
		defaults: {
			from: mailFrom
		}
	}
}
