import { existsSync } from "fs";
import createFolder from "./file/createFolder.js";
import sqlite3 from "sqlite3";
import { SQL_COMMANDS, DB_MESSAGES, PATH_TO_FILE_DB, PATH_TO_FOLDER_DB } from "./constants.js";

function initDb() {
	if (!existsSync(PATH_TO_FOLDER_DB)) {
		createFolder(PATH_TO_FOLDER_DB);
	}

	if (!existsSync(PATH_TO_FILE_DB)) {
		const db = new sqlite3.Database(PATH_TO_FILE_DB, (err) => {
			if (err) {
				console.error(DB_MESSAGES.connect.error, err.message);
			} else {
				console.log(DB_MESSAGES.connect.success);
			}
		});

		db.serialize(() => {
			db.run(SQL_COMMANDS.createTableQuery, (err) => {
				if (err) {
					console.error(DB_MESSAGES.creating_table.error, err.message);
				} else {
					console.log(DB_MESSAGES.creating_table.success);
				}
			});
		});

		db.close((err) => {
			if (err) {
				console.error(DB_MESSAGES.closed.error, err.message);
			} else {
				console.log(DB_MESSAGES.closed.success);
			}
		});
	} else {
		console.log(DB_MESSAGES.is_exist);
	}
}

export default initDb;
