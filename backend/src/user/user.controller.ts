import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth, ApiBody } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

import { Authorization } from '@/auth/decorators/auth.decorator'
import { Authorized } from '@/auth/decorators/authorized.decorator'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

/**
 * Контроллер для управления пользователями.
 */
@ApiTags('users')
@ApiCookieAuth('session')
@Controller('users')
export class UserController {
	/**
	 * Конструктор контроллера пользователей.
	 * @param userService - Сервис для работы с пользователями.
	 */
	public constructor(private readonly userService: UserService) {}

	/**
	 * Получает профиль текущего пользователя.
	 * @param userId - ID авторизованного пользователя.
	 * @returns Профиль пользователя.
	 */
	@ApiOperation({ summary: 'Получить профиль текущего пользователя' })
	@ApiResponse({ status: 200, description: 'Профиль успешно получен' })
	@ApiResponse({ status: 401, description: 'Не авторизован' })
	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId)
	}

	/**
	 * Получает пользователя по ID (доступно только администраторам).
	 * @param id - ID пользователя.
	 * @returns Найденный пользователь.
	 */
	@ApiOperation({ summary: 'Получить пользователя по ID (только для администраторов)' })
	@ApiResponse({ status: 200, description: 'Пользователь найден' })
	@ApiResponse({ status: 401, description: 'Не авторизован' })
	@ApiResponse({ status: 403, description: 'Нет прав доступа' })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') id: string) {
		return this.userService.findById(id)
	}

	/**
	 * Обновляет профиль текущего пользователя.
	 * @param userId - ID авторизованного пользователя.
	 * @param dto - Данные для обновления профиля.
	 * @returns Обновленный профиль пользователя.
	 */
	@ApiOperation({ summary: 'Обновить профиль текущего пользователя' })
	@ApiResponse({ status: 200, description: 'Профиль успешно обновлен' })
	@ApiResponse({ status: 401, description: 'Не авторизован' })
	@ApiBody({ type: UpdateUserDto })
	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.update(userId, dto)
	}
}
