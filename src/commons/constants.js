export const ALLOWED_USERNAMES = ["Ваш юзернейм"];
export const TOKENS = "Ваш токен";
export const PATH_TO_FILE_DB = "./src/database/wishes.db";
export const PATH_TO_FOLDER_DB = "./src/database";
export const MESSAGE_EMPTY_LIST = "Список желаний пока пуст";
export const MESSAGE_WELCOME = "Выбери команду для начала работы со списом желаний:";
export const MESSAGE_FOLDER_EXISTS = "Директория существует";
export const MESSAGE_DISPLAY_BUTTONS_LIST = "Кнопки управления списком отобразятся, если желаний будет больше 10";
export const MESSAGE_ADD_LINK = "Добавьте ссылку";
export const MESSAGE_ADD_TITLE = "Добавьте заголовок";
export const REGEXP_WISH_COMMAND = /p\_(\d+)\_w\_(\d+)/;
export const REGEXP = {
	wish_command: /p\_(\d+)\_w\_(\d+)/,
	next_page: /^next\:\d+/,
	prev_page: /^prev\:\d+/,
};
export const MESSAGE_WISH_IS_NOT_EXIST = "Такого желания уже нет...";
export const SQL_COMMANDS = {
	deleteWishOfId: `DELETE FROM wishes WHERE id = ?`,
	insertWish: `INSERT INTO wishes(
        title, link, granted
    ) VALUES(?, ?, ?)`,
	selectGrantedWishes: `SELECT * FROM wishes WHERE granted = 1`,
	selectUnrelizedWishes: `SELECT * FROM wishes WHERE granted = 0`,
	updateGrantedFieldOfWish: `UPDATE wishes SET granted = 1 WHERE id = ?`,
	selectWishOfId: `SELECT * FROM wishes WHERE id = ?`,
	createTableQuery: `
        CREATE TABLE IF NOT EXISTS wishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            link TEXT,
            granted INTEGER DEFAULT 0
        );
    `,
};
export const DB_MESSAGES = {
	connect: {
		error: "Ошибка подключения к базе данных:",
		success: "Успешное подключение к базе данных",
	},
	creating_table: {
		error: "Ошибка создания таблицы:",
		success: "Таблица wishes успешно создана",
	},
	closed: {
		error: "Ошибка закрытия соединения с базой данных:",
		success: "Соединение с базой данных закрыто",
	},
	is_exist: "База данных уже создана",
};
