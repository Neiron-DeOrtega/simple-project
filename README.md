Документация к Эндпоинтам

---

### API для работы с постами

#### 1. **Создание поста**

- **URL**: `/posts`
- **Метод**: `POST`
- **Авторизация**: Требуется токен пользователя.
- **Описание**: Создает новый пост. Прикрепленные файлы (медиа) могут быть добавлены до 5 штук.
  
- **Тело запроса**:
  ```json
  {
    "text": "Текст поста",
    "userId": "ID пользователя"
  }
  ```
  **Файлы**: В теле запроса можно отправить файлы с именем поля `media` (до 5 файлов).

- **Ответ**:
  - **Успех (201)**: 
    ```json
    {
      "message": "Post created successfully"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "message": "Error creating post",
      "error": "Детали ошибки"
    }
    ```

#### 2. **Получение списка постов**

- **URL**: `/posts/:id`
- **Метод**: `GET`
- **Описание**: Получает список постов на определенной странице (по 10 постов на страницу). В ответе возвращается информация о медиа файлах (в base64).
  
- **Параметры**:
  - `id` (параметр URL): Номер страницы (например, 1 для первой страницы).

- **Ответ**:
  - **Успех (200)**:
    ```json
    {
      "postsWithMedia": [
        {
          "id": 1,
          "text": "Текст поста",
          "user": "username",
          "date": "2025-01-31T12:34:56.789Z",
          "media": [
            {
              "id": 1,
              "fileName": "image.jpg",
              "base64": "data:image/jpeg;base64,..."
            }
          ]
        }
      ],
      "postsCount": 100
    }
    ```
  - **Ошибка (400)**:
    ```json
    {
      "error": "Некорректный идентификатор страницы"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "error": "Произошла ошибка при получении постов"
    }
    ```

#### 3. **Получение постов пользователя**

- **URL**: `/my-posts/:id`
- **Метод**: `GET`
- **Авторизация**: Требуется токен пользователя.
- **Описание**: Получение всех постов текущего пользователя на определенной странице (по 10 постов на страницу). В ответе также информация о медиа файлах.

- **Параметры**:
  - `id` (параметр URL): Номер страницы.
  
- **Тело запроса**:
  ```json
  {
    "userId": "ID пользователя"
  }
  ```

- **Ответ**:
  - **Успех (200)**:
    ```json
    {
      "postsWithMedia": [
        {
          "id": 1,
          "text": "Текст поста",
          "user": "username",
          "date": "2025-01-31T12:34:56.789Z",
          "media": [
            {
              "id": 1,
              "fileName": "image.jpg",
              "base64": "data:image/jpeg;base64,..."
            }
          ]
        }
      ],
      "postsCount": 10
    }
    ```
  - **Ошибка (400)**:
    ```json
    {
      "error": "Некорректный идентификатор страницы"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "error": "Произошла ошибка при получении постов"
    }
    ```

#### 4. **Удаление поста**

- **URL**: `/my-posts/:pid`
- **Метод**: `DELETE`
- **Авторизация**: Требуется токен пользователя.
- **Описание**: Удаляет пост с указанным ID. Также удаляются прикрепленные медиа файлы с диска.

- **Параметры**:
  - `pid` (параметр URL): ID поста для удаления.

- **Ответ**:
  - **Успех (200)**:
    ```json
    {
      "message": "Пост успешно удален"
    }
    ```
  - **Ошибка (404)**:
    ```json
    {
      "message": "Пост не найден"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "message": "Внутренняя ошибка сервера"
    }
    ```

#### 5. **Редактирование поста**

- **URL**: `/my-posts/:pid`
- **Метод**: `PUT`
- **Авторизация**: Требуется токен пользователя.
- **Описание**: Редактирует текст поста с указанным ID.

- **Параметры**:
  - `pid` (параметр URL): ID поста для редактирования.
  
- **Тело запроса**:
  ```json
  {
    "text": "Новый текст поста"
  }
  ```

- **Ответ**:
  - **Успех (200)**:
    ```json
    {
      "message": "Пост успешно отредактирован",
      "post": {
        "id": 1,
        "text": "Новый текст поста",
        "user": "username",
        "date": "2025-01-31T12:34:56.789Z"
      }
    }
    ```
  - **Ошибка (404)**:
    ```json
    {
      "message": "Пост не найден"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "message": "Произошла ошибка при редактировании поста"
    }
    ```

---

Отлично! Теперь добавлю документацию для эндпоинтов, связанных с пользователями.

---

### API для работы с пользователями

#### 1. **Регистрация пользователя**

- **URL**: `/register`
- **Метод**: `POST`
- **Описание**: Регистрирует нового пользователя. При успешной регистрации возвращаются access и refresh токены для авторизации.

- **Тело запроса**:
  ```json
  {
    "login": "username",
    "password": "password123"
  }
  ```

- **Ответ**:
  - **Успех (201)**:
    ```json
    {
      "message": "User created successfully",
      "accessToken": "access_token_here",
      "refreshToken": "refresh_token_here"
    }
    ```
  - **Ошибка (400)**: Если пользователь уже существует.
    ```json
    {
      "message": "User already exists"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "message": "Internal server error"
    }
    ```

#### 2. **Авторизация пользователя (вход)**

- **URL**: `/login`
- **Метод**: `POST`
- **Описание**: Авторизует пользователя. В случае успешного входа возвращаются access и refresh токены для последующих запросов.

- **Тело запроса**:
  ```json
  {
    "login": "username",
    "password": "password123"
  }
  ```

- **Ответ**:
  - **Успех (200)**:
    ```json
    {
      "message": "Logged in successfully",
      "accessToken": "access_token_here",
      "refreshToken": "refresh_token_here"
    }
    ```
  - **Ошибка (404)**: Если пользователь не найден.
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Ошибка (401)**: Если неверный пароль.
    ```json
    {
      "message": "Invalid password"
    }
    ```
  - **Ошибка (500)**:
    ```json
    {
      "message": "Internal server error"
    }
    ```

---
