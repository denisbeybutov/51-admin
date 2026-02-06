import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { Request } from 'express'

import { ConfirmationDto } from './dto/confirmation.dto'
import { EmailConfirmationService } from './email-confirmation.service'

/**
 * Контроллер для управления подтверждением электронной почты.
 */
@ApiTags('email-confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	/**
	 * Конструктор контроллера подтверждения электронной почты.
	 * @param emailConfirmationService - Сервис для управления подтверждением электронной почты.
	 */
	public constructor(
		private readonly emailConfirmationService: EmailConfirmationService
	) {}

	/**
	 * Обрабатывает запрос на подтверждение электронной почты.
	 * @param req - Объект запроса Express.
	 * @param dto - DTO с токеном подтверждения.
	 * @returns Сессия пользователя после успешного подтверждения.
	 */
	@ApiOperation({ summary: 'Подтвердить email с помощью токена' })
	@ApiResponse({ status: 200, description: 'Email успешно подтвержден' })
	@ApiResponse({ status: 400, description: 'Неверный или истекший токен' })
	@ApiBody({ type: ConfirmationDto })
	@Post()
	@HttpCode(HttpStatus.OK)
	public async newVerification(
		@Req() req: Request,
		@Body() dto: ConfirmationDto
	) {
		return this.emailConfirmationService.newVerification(req, dto)
	}
}
