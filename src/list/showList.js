import { SQL_COMMANDS, MESSAGE_EMPTY_LIST, PATH_TO_FILE_DB } from "../commons/constants.js";
import sqlite3 from "sqlite3";
import { fetchAll } from "../commons/sqlHelpers/fetchData.js";
import sendPage from "./sendPage.js";
import mainKeyboard from "../keyboards/mainKeyboard.js";

export default async function showList(bot, chatId, messageId, type, currentPage = 1) {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		let sqlCommand = type === "granted" ? SQL_COMMANDS.selectGrantedWishes : SQL_COMMANDS.selectUnrelizedWishes;

		const wishes = await fetchAll(dbWishes, sqlCommand);

		if (wishes.length) {
			await sendPage(bot, chatId, messageId, currentPage, wishes, type);
		} else {
			await bot.editMessageText(MESSAGE_EMPTY_LIST, {
				chat_id: chatId,
				message_id: messageId,
				reply_markup: {
					inline_keyboard: mainKeyboard,
				},
				parse_mode: "Markdown",
				disable_web_page_preview: true,
			});
		}
	} catch (error) {
		console.error(error, "ShowList");
	} finally {
		dbWishes.close();
	}
}
