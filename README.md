## WEB-MESSENGER

![Build status](https://github.com/aleksandr-loskutov/middle.messenger.praktikum.yandex/actions/workflows/docker-deploy.yml/badge.svg)

Приложение веб-чат с возможностью регистрации и переписки (MVP). Без использования фреймворков. Разработано на шаблонизаторе, ооп и сокетах. Вёрстка по макету с нуля. Реализована валидация форм, взаимодействие с сервером, обмен сообщениями, авторизация, регистрация, редактирование профиля, изменение аватара, создание и удаление чатов, добавление пользователей в чаты.

## Demo
Доступно [по ссылке](https://messenger.aleksandrl.ru/sign-up).

## Screenshot
![App Screenshot](https://files.aleksandrl.ru/sites/portfolio/img/messenger.png)

## Video
[ Короткое видео с функционалом](https://www.berrycast.com/conversations/f93c3464-fca4-5ac6-b8e4-40fec9627002).
## Страницы:

- [Вход](https://messenger.aleksandrl.ru/)
- [Регистрация](https://messenger.aleksandrl.ru/sign-up)
- [Чат](https://messenger.aleksandrl.ru/messenger)
- [Профиль](https://messenger.aleksandrl.ru/settings)
- [404](https://messenger.aleksandrl.ru/404)

## Установка

- `npm install` — установка;
- `npm start` — запуск версии для разработчика;
- `npm run lint` — запуск линтера;
- `npm run test` — запуск тестов;
- `npm run build` — сборка статики в папку `dist`;
- `npm run serve` — запуск сервера для раздачи статики из папки `dist`;

## Технологии
- [TypeScript](https://www.typescriptlang.org/)
- [Макет приложения](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1) - в стиле телеграм;
- [Express](http://expressjs.com/) — веб-сервер;
- [Handlebars](http://handlebarsjs.com/) — шаблонизатор;
- [SASS](https://sass-lang.com/) — препроцессор;
- [Webpack](https://webpack.js.org/) — сборщик;
- [Websockets](https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API) — обмен сообщениями;
- [Docker](https://www.docker.com/) + [github actions](https://github.com/features/actions) для автодеплоя на VDS;
- EsLint, Stylelint, Prettier — линтеры.
