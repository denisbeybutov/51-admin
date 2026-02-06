import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

/**
 * DTO для входа пользователя в систему.
 */
export class LoginDto {
	/**
	 * Email пользователя.
	 */
	@ApiProperty({
		description: 'Email пользователя',
		example: 'user@example.com',
		format: 'email'
	})
	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Email обязателен для заполнения.' })
	email: string

	/**
	 * Пароль пользователя.
	 */
	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'password123',
		minLength: 6
	})
	@IsString({ message: 'Пароль должен быть строкой.' })
	@IsNotEmpty({ message: 'Поле пароль не может быть пустым.' })
	@MinLength(6, { message: 'Пароль должен содержать не менее 6 символов.' })
	password: string

	/**
	 * Код двухфакторной аутентификации (необязательно).
	 */
	@ApiPropertyOptional({
		description: 'Код двухфакторной аутентификации (если включена 2FA)',
		example: '123456',
		minLength: 6,
		maxLength: 6
	})
	@IsOptional()
	@IsString()
	code: string
}
