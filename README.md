# Wishlist Telegram Bot on NodeJs with SQlite3 database

## О боте

Telegram Бот для создания списков желаний. Пользоваться ботом может только пользователь с юзернеймом, указанным в файле [constants.js](https://github.com/sqlzzy/wishlist-tg-bot-db/blob/master/src/commons/constants.js#L1).

## Возможности бота

1) Сортировка желаний по категориям:  
    - исполненные,  
    - неисполненные;  
2) Просмотр списков желаний;  
3) Управление навигацией списка желаний. Выводится по 10 желаний в одном сообщении. При общем кол-ве желаний больше 10, для просмотра следующих появляется клавиатура;  
4) Добавление, удаление или отмечание желания, как исполненное.  

## Структура данных

При запуске проекта создается база данных SQlite3 с таблицей **wishes** с полями:  
**id** — id желания;  
**title** — заголовок желания;  
**link** - ссылка;  
**granted** - статус желания (0 — неисполненное, 1 — исполненное).

## Инструкция

1) Склонируйте репозиторий:   
    - HTTPS: ```git clone https://github.com/sqlzzy/wishlist-telegram-bot.git name_your_folder```  ;
    - SSH: ```git clone git@github.com:sqlzzy/wishlist-telegram-bot.git name_your_folder```.
2) Создайте токен бота через [@BotFather](https://telegram.me/BotFather);
3) Вставьте [токен бота](https://github.com/sqlzzy/wishlist-tg-bot-db/blob/master/src/commons/constants.js#L2) и [свой юзернейм](https://github.com/sqlzzy/wishlist-tg-bot-db/blob/master/src/commons/constants.js#L1) в файле [constants.js](https://github.com/sqlzzy/wishlist-tg-bot-db/blob/master/src/commons/constants.js);
4) Установите npm-пакеты: ```npm i```;
5) Запуск проекта:  
    - локально: ```npm run dev``` (запустится утилита nodemon. Она будет отслеживать изменения и автоматически перезапускать процесс);  
    - на сервере: ``pm2 start src/server.js`` (менеджер процессов pm2 должен быть предварительно установлен на сервере).  

## Автор

[Sergey Osipov](https://github.com/sqlzzy)
