# Тестовое задание компании YetiCrab

## Задачи

- разработать прототип системы ведения заявок для логистов в авто грузоперевозках в виде web-приложения, включающий в себя вывод таблицы с заявками, счетчик заявок (количество заявок в таблице)
- реализовать режим администратора (без авторизации), в котором появляется возможность просмотра, редактирования и удаления заявок, создание новых заявок
- предоставить вариант документации к REST API для данного проекта
- реализовать дизайн с применением библиотеки компонентов [Gravity UI](https://gravity-ui.com/)
- использовать одну из frontend-технологий: TypeScript + React / Next.js
- можно использовать любые дополнительные библиотеки

### Данные заявок

- Номер заявки
- Дата и время получения заявки от клиента
- Название фирмы клиента
- ФИО перевозчика
- Контактный телефон перевозчика
- Комментарии
- Статус заявки: новая, в работе, завершено. При создании новой заявки у неё автоматически выставляется статус “новая”. При редактировании статус можно поменять на “в работе” или на “завершено”.
- ATI код сети перевозчика (кликабельно, переход на сайт). Ссылка такого вида: https://ati.su/firms/{ati}/info (пример: https://ati.su/firms/12345/info)

## Комментарии к выполненному заданию

- Проект выполнен с применением стэка Vite / React / Redux / TypeScript / Gravity UI
  - `npm run dev` - запускает режим разрабочика
  - `npm run build` - собирает продакшн-сборку
- Заявки хранятся и в стэйт-переменной records, которая имитирует работу с бэк-ендом. При редактировании/создании заявок, их данные также добавляются в стэйт. В реальном приложении нужно получать данные с сервера и отправлять на сервер, и менять стэйт только после успешного ответа от сервера (либо показывать ошибку)
- Номер следующей заявки в поекте хранится в стэйт-переменной newOrderNumber, её значение увеличивается на 1 при создании каждой заявки. В работающем приложении генерация номера заявки должна происходить на бэк-енде и возвращаться в ответе от сервера после успешного создания заявки
- Время создания заявки в проекте генерируется на фронт-енде. В реальном проекте время должно фиксироваться при создании заявки на сервере, чтобы не случилось казусов (например, если на устройстве клиента стоит неправильное время или сбился часовой пояс)
- Валидация заявок происходит в реальном времени при изменении данных в полях ввода. При открытии модального окна кнопка добавления/сохранения неактивна, так как данные либо ещё не вводились, либо не были изменены. В реальном проекте также можно сравнивать вновь введённые данные с теми, что храняться в заявке, чтобы не отправлять на сервер валидный запрос с неизменёнными данными.
- Номер телефона и ATI-код маскируются для консистентности и валидности (значения этих поля ввода обрабатывается при каждом изменении)

## Вариант документации к Rest API

API с авторизацией и хранением Bearer-токена

### Переменные

- `BASE_URL` - основная ссылка, на которую отправляются запросы
- `TOKEN` - уникальный токен для авторизации пользователя, генерируемый на бэк-енде
- `ID` - уникальный номер заявки

### Роуты на бэкенде

На бэк-енде ожидаются запросы на базовый URL (`BASE_URL`) по роутам:

- /signup
- /signin
- /user
- /orders

### API-запросы

- Регистрация пользователя. Отправляется POST-запрос на роут `${BASE_URL}/signup`. В теле запроса методом `JSON.stringify` отправляются необходимы для регистрации данные (например, имя, email, пароль, данные организации)
- Авторизация пользователя. Если пользователь не авторизован, или токен пользователя невалиден, то пользователя перебрасывает на страницу авторизации. Для аутентификации пользователь отправляет POST-запрос на роут `${BASE_URL}/signin`, в теле запроса методом `JSON.stringify` отправляется объект `{ login, password }` с логином и паролем. Если аутентификация происходит успешно, то пользователю возвращается токен для дальнейшей работы с приложением, в токене хранится уникальный id пользователя.
- Получение заявок. Отправляется GET-запрос на роут `${BASE_URL}/orders`. В заголовке запроса Authorization передается строка `Bearer ${TOKEN}`. При успешной авторизации от сервера приходит ответ с массивом объектов-заявок.
- Сохранение новой заявки. Отправляется POST-запрос на роут `${BASE_URL}/orders`. В заголовке запроса Authorization передается строка `Bearer ${TOKEN}`. В теле запроса методом `JSON.stringify` отправляются данные заявки. При успешной авторизации на сервере и валидации данных, создается новая заявка, и в ответе приходит обратно объект-заявка, дополненная полями с уникальным id, номером и временем создания.
- Редактирование заявки. Отправляется PATCH-запрос на роут `${BASE_URL}/orders`. В заголовке запроса Authorization передается строка `Bearer ${TOKEN}`. В теле запроса методом `JSON.stringify` отправляются исправленные данные заявки. При успешной авторизации на сервере и валидации данных, происходит поиск заявки по её id. Далее, если id создателя заявки и id пользователя совпадают, то происходит редактирование данных, иначе сервер возвращает ошибку. При успешном выполнении запроса, пользователю в ответе приходит объект с обновленными данными заявки.
- Удаление заявки. Отправляется DELETE-запрос на роут `${BASE_URL}/orders/${ID}`. В заголовке запроса Authorization передается строка `Bearer ${TOKEN}`. При успешной авторизации на сервере, происходит поиск заявки по её id. Если id создателя заявки и id пользователя совпадают, то происходит удаление заявки и сервер присылает ответ. В случае ошибки - приходит ошибка (не найдена заявка, нет прав на удаление и т.д.)

### Пример запроса для получения списка заявок

```javascript
const getOrders = token => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    }
  }).then(response => {
    if (!response.ok) {
      console.log(`Ошибка: ${res.status}`);
      return Promise.reject(response);
    }
    return response.json();
  });
};
```

## Что можно улучшить

- добавить адаптивность
