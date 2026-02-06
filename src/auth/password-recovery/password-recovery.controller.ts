import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'
import { Recaptcha } from '@nestlab/google-recaptcha'

import { NewPasswordDto } from './dto/new-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { PasswordRecoveryService } from './password-recovery.service'

/**
 * Контроллер для управления восстановлением пароля.
 */
@ApiTags('password-recovery')
@Controller('auth/password-recovery')
export class PasswordRecoveryController {
	/**
	 * Конструктор контроллера восстановления пароля.
	 * @param passwordRecoveryService - Сервис для управления восстановлением пароля.
	 */
	public constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService
	) {}

	/**
	 * Запрашивает сброс пароля и отправляет токен на указанный email.
	 * @param dto - DTO с адресом электронной почты пользователя.
	 * @returns true, если токен успешно отправлен.
	 */
	@ApiOperation({ summary: 'Запросить сброс пароля' })
	@ApiResponse({ status: 200, description: 'Письмо для сброса пароля отправлено' })
	@ApiResponse({ status: 400, description: 'Неверный email' })
	@ApiBody({ type: ResetPasswordDto })
	@Recaptcha()
	@Post('reset')
	@HttpCode(HttpStatus.OK)
	public async resetPassword(@Body() dto: ResetPasswordDto) {
		return this.passwordRecoveryService.reset(dto)
	}

	/**
	 * Устанавливает новый пароль для пользователя.
	 * @param dto - DTO с новым паролем.
	 * @param token - Токен для сброса пароля.
	 * @returns true, если пароль успешно изменен.
	 */
	@ApiOperation({ summary: 'Установить новый пароль' })
	@ApiResponse({ status: 200, description: 'Пароль успешно изменен' })
	@ApiResponse({ status: 400, description: 'Неверный или истекший токен' })
	@ApiParam({ name: 'token', description: 'Токен для сброса пароля' })
	@ApiBody({ type: NewPasswordDto })
	@Recaptcha()
	@Post('new/:token')
	@HttpCode(HttpStatus.OK)
	public async newPassword(
		@Body() dto: NewPasswordDto,
		@Param('token') token: string
	) {
		return this.passwordRecoveryService.new(dto, token)
	}
}
