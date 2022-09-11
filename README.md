## WEB-MESSENGER

![Build status](https://github.com/aleksandr-loskutov/middle.messenger.praktikum.yandex/actions/workflows/docker-deploy.yml/badge.svg)

Приложение веб-чат с возможностью регистрации и переписки (MVP).
Доступно [по ссылке](http://aleksandrl.ru:1501/).

Страницы:

- [Вход](http://aleksandrl.ru:1501/)
- [Регистрация](http://aleksandrl.ru:1501/sign-up)
- [Чат](http://aleksandrl.ru:1501/messenger)
- [Профиль](http://aleksandrl.ru:1501/settings)
- [404](http://aleksandrl.ru:1501/404)

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
