import sqlite3 from "sqlite3";
import {
	SQL_COMMANDS,
	MESSAGE_ADD_LINK,
	MESSAGE_ADD_TITLE,
	PATH_TO_FILE_DB,
} from "../commons/constants.js";
import execute from "../commons/sqlHelpers/execute.js";

async function addItem(bot, chatId) {
	try {
		await bot.sendMessage(chatId, MESSAGE_ADD_LINK);
		await bot.on(
			"text",
			async (msg) => {
				addLink(bot, chatId, { granted: 0 }, msg.text);

				bot.removeListener("text");
			},
			{
				disable_web_page_preview: true,
			},
		);
	} catch (error) {
		console.error(error);
	}
}

async function addLink(bot, chatId, data, link) {
	try {
		data.link = link;

		await bot.sendMessage(chatId, MESSAGE_ADD_TITLE);
		await bot.on("text", async (msg) => {
			addTitle(bot, chatId, data, msg.text);

			bot.removeListener("text");
		});
	} catch (error) {
		console.error(error);
	}
}

async function addTitle(bot, chatId, data, title) {
	try {
		data.title = title;

		await addItemToDb(bot, chatId, data);
	} catch (error) {
		console.error(error);
	}
}

async function addItemToDb(bot, chatId, dataItem) {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		await execute(dbWishes, SQL_COMMANDS.insertWish, [dataItem.title, dataItem.link, dataItem.granted]);

		bot.sendMessage(chatId, `Добавлено желание: <a href="${dataItem.link}">${dataItem.title}</a>`, {
			parse_mode: "HTML",
			disable_web_page_preview: true,
		});
	} catch (error) {
		console.error(error, "AddItem");
	} finally {
		dbWishes.close();
	}
}

export default addItem;
