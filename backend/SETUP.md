# 🚀 Инструкция по запуску бэкенда

## 📋 Содержание

1. [Предварительные требования](#предварительные-требования)
2. [Установка](#установка)
3. [Настройка окружения](#настройка-окружения)
4. [Запуск базы данных](#запуск-базы-данных)
5. [Запуск приложения](#запуск-приложения)
6. [Тестирование API](#тестирование-api)
7. [Полезные команды](#полезные-команды)
8. [Решение проблем](#решение-проблем)

---

## 📦 Предварительные требования

Перед началом убедитесь, что у вас установлены:

### 1. Node.js (v18+ рекомендуется)
```bash
node --version  # Проверка версии
```
Скачать: https://nodejs.org/

### 2. Docker Desktop
```bash
docker --version  # Проверка версии
```
Скачать: https://www.docker.com/products/docker-desktop

### 3. npm или bun (менеджер пакетов)
```bash
npm --version   # или
bun --version
```

---

## 🔧 Установка

### Шаг 1: Клонирование репозитория

```bash
git clone <repository-url>
cd nestjs-full-authorization
```

### Шаг 2: Установка зависимостей

```bash
npm install
# или
bun install
```

---

## ⚙️ Настройка окружения

### Шаг 1: Создайте файл `.env`

Файл `.env` уже должен существовать в корне проекта. Проверьте его содержимое:

```bash
cat .env
```

### Шаг 2: Настройте SMTP для отправки email

#### Вариант A: Resend (рекомендуется для production)

1. Зарегистрируйтесь на https://resend.com/
2. Получите API ключ
3. Обновите `.env`:

```env
MAIL_HOST='smtp.resend.com'
MAIL_PORT=587
MAIL_LOGIN='resend'
MAIL_PASSWORD='ваш_api_key'
MAIL_FROM='onboarding@resend.dev'  # или ваш верифицированный домен
```

**Важно:** В бесплатной версии Resend можно отправлять только на email, с которым зарегистрирован аккаунт, если не верифицирован домен.

#### Вариант B: Ethereal Email (для тестирования)

1. Откройте https://ethereal.email/
2. Нажмите "Create Ethereal Account"
3. Скопируйте credentials в `.env`:

```env
MAIL_HOST='smtp.ethereal.email'
MAIL_PORT=587
MAIL_LOGIN='полученный_username@ethereal.email'
MAIL_PASSWORD='полученный_password'
MAIL_FROM='test@ethereal.email'
```

4. Письма смотрите на https://ethereal.email/messages

#### Вариант C: Gmail (для production)

1. Включите 2FA в Google аккаунте: https://myaccount.google.com/security
2. Создайте App Password: https://myaccount.google.com/apppasswords
3. Обновите `.env`:

```env
MAIL_HOST='smtp.gmail.com'
MAIL_PORT=587
MAIL_LOGIN='ваш_email@gmail.com'
MAIL_PASSWORD='16_значный_app_password'
MAIL_FROM='ваш_email@gmail.com'
```

### Шаг 3: Проверьте остальные настройки `.env`

Базовые настройки уже должны быть корректными:

```env
NODE_ENV='development'
APPLICATION_PORT=4000
APPLICATION_URL='http://localhost:4000'
ALLOWED_ORIGIN='http://localhost:3000'

POSTGRES_USER='nestjs_user'
POSTGRES_PASSWORD='nestjs_password'
POSTGRES_HOST='localhost'
POSTGRES_PORT=5433
POSTGRES_DB='nestjs_auth_db'

REDIS_PASSWORD='redis_password'
REDIS_HOST='localhost'
REDIS_PORT=6379
```

---

## 🐳 Запуск базы данных

### Шаг 1: Запустите Docker контейнеры

```bash
docker-compose up -d
```

Эта команда запустит:
- **PostgreSQL** на порту 5433
- **Redis** на порту 6379

### Шаг 2: Проверьте, что контейнеры запущены

```bash
docker ps
```

Вы должны увидеть контейнеры `postgres` и `redis` в списке.

### Шаг 3: Примените миграции базы данных

```bash
npm run prisma:generate   # Генерация Prisma Client
npm run prisma:migrate    # Применение миграций
```

При первом запуске введите название миграции (например, `init`).

---

## ▶️ Запуск приложения

### Режим разработки (с hot-reload)

```bash
npm run start:dev
```

### Production режим

```bash
npm run build
npm run start:prod
```

### Проверка запуска

После успешного запуска вы увидите:

```
🚀 Application is running on: http://localhost:4000
📚 Swagger documentation: http://localhost:4000/api/docs
```

---

## 🧪 Тестирование API

### Вариант 1: Swagger UI (Рекомендуется)

1. Откройте в браузере: http://localhost:4000/api/docs
2. Выберите нужный эндпоинт
3. Нажмите "Try it out"
4. Заполните данные и нажмите "Execute"

**Пример тестирования:**
1. POST `/auth/register` - зарегистрируйте пользователя
2. POST `/auth/login` - войдите (cookie сохранится автоматически)
3. GET `/users/profile` - получите профиль

### Вариант 2: Postman

#### Базовый URL
```
http://localhost:4000
```

#### Основные эндпоинты:

**Регистрация:**
```
POST /auth/register
Content-Type: application/json

{
  "name": "Иван Иванов",
  "email": "test@example.com",
  "password": "password123",
  "passwordRepeat": "password123"
}
```

**Логин:**
```
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Получить профиль (требует авторизацию):**
```
GET /users/profile
```

**Важно:** В Postman включите "Automatically follow redirects" и "Send cookies automatically" в настройках.

### Вариант 3: cURL

```bash
# Регистрация
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "test123",
    "passwordRepeat": "test123"
  }'

# Логин
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }'

# Профиль (с cookie)
curl -X GET http://localhost:4000/users/profile \
  -b cookies.txt
```

---

## 🛠 Полезные команды

### Управление базой данных

```bash
# Prisma Studio - GUI для БД
npm run prisma:studio
# Откроется http://localhost:5555

# Создать новую миграцию
npm run prisma:migrate

# Сгенерировать Prisma Client
npm run prisma:generate

# Подключиться к PostgreSQL напрямую
docker exec -it postgres psql -U nestjs_user -d nestjs_auth_db
```

### Управление Docker контейнерами

```bash
# Запуск контейнеров
docker-compose up -d

# Остановка контейнеров
docker-compose down

# Просмотр логов
docker-compose logs -f

# Перезапуск контейнеров
docker-compose restart

# Удаление контейнеров с данными (ОСТОРОЖНО!)
docker-compose down -v
```

### Разработка

```bash
# Форматирование кода
npm run format

# Линтинг
npm run lint

# Build проекта
npm run build
```

---

## 🐛 Решение проблем

### Проблема: Docker контейнеры не запускаются

**Решение:**
```bash
# Проверьте, что Docker Desktop запущен
docker --version

# Проверьте свободные порты
lsof -i :5433  # PostgreSQL
lsof -i :6379  # Redis

# Перезапустите контейнеры
docker-compose down
docker-compose up -d
```

### Проблема: Ошибка подключения к базе данных

**Решение:**
```bash
# Убедитесь, что контейнеры запущены
docker ps

# Проверьте логи PostgreSQL
docker logs postgres

# Пересоздайте контейнеры
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
```

### Проблема: SMTP ошибки (535, 501, 450)

**Решение:**

- **535 Authentication failed** - Неверные SMTP credentials
  - Для Gmail используйте App Password, не обычный пароль
  - Для Resend проверьте API ключ
  
- **450 Resend error** - Можете отправлять только на свой email
  - Используйте email, с которым зарегистрирован Resend аккаунт
  - Или верифицируйте домен в Resend Dashboard
  
- **Greeting never received** - Таймаут подключения
  - Проверьте интернет соединение
  - Используйте порт 587 вместо 465

**Быстрое решение:** Используйте Ethereal Email для тестирования (см. раздел "Настройка окружения")

### Проблема: Prisma ошибки

**Решение:**
```bash
# Удалите и переустановите зависимости
rm -rf node_modules package-lock.json
npm install

# Пересоздайте Prisma Client
npm run prisma:generate

# Проверьте схему
npx prisma validate
```

### Проблема: Порт 4000 уже занят

**Решение:**
```bash
# Найдите процесс на порту 4000
lsof -i :4000

# Убейте процесс
kill -9 <PID>

# Или измените порт в .env
APPLICATION_PORT=4001
```

---

## 📚 Дополнительные ресурсы

### API Документация
- Swagger UI: http://localhost:4000/api/docs

### Управление данными
- Prisma Studio: http://localhost:5555 (запустите `npm run prisma:studio`)

### Внешние сервисы
- Resend Dashboard: https://resend.com/dashboard
- Ethereal Email: https://ethereal.email/messages

---

## 🎯 Быстрый старт (TL;DR)

Если вы опытный разработчик и хотите запустить проект быстро:

```bash
# 1. Установите зависимости
npm install

# 2. Настройте SMTP в .env (используйте Ethereal для тестирования)
# Получите credentials: https://ethereal.email/

# 3. Запустите Docker
docker-compose up -d

# 4. Примените миграции
npm run prisma:generate
npm run prisma:migrate

# 5. Запустите приложение
npm run start:dev

# 6. Откройте Swagger
# http://localhost:4000/api/docs
```

---

## ✅ Готово!

Теперь ваш бэкенд запущен и готов к работе! 🎉

**Следующие шаги:**
1. Откройте Swagger: http://localhost:4000/api/docs
2. Зарегистрируйте тестового пользователя
3. Проверьте email для получения токена подтверждения
4. Протестируйте все эндпоинты

**Нужна помощь?** Проверьте раздел "Решение проблем" выше.
