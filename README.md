## WEB-MESSENGER

![Build status](https://github.com/aleksandr-loskutov/middle.messenger.praktikum.yandex/actions/workflows/docker-deploy.yml/badge.svg)

Приложение веб-чат с возможностью регистрации и переписки (MVP).
Доступно [по ссылке](https://messenger.aleksandrl.ru/).

Страницы:

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
- [Макет приложения](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1) - от Яндекса;
- [Express](http://expressjs.com/) — веб-сервер;
- [Handlebars](http://handlebarsjs.com/) — шаблонизатор;
- [SASS](https://sass-lang.com/) — препроцессор;
- [Webpack](https://webpack.js.org/) — сборщик;
- [Websockets](https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API) — обмен сообщениями;
- [Docker](https://www.docker.com/) + [github actions](https://github.com/features/actions) для автодеплоя на VDS;
- EsLint, Stylelint, Prettier — линтеры.
