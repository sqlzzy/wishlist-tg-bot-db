import { SQL_COMMANDS, PATH_TO_FILE_DB } from "../commons/constants.js";
import sqlite3 from "sqlite3";
import { fetchFirst } from "../commons/sqlHelpers/fetchData.js";
import execute from "../commons/sqlHelpers/execute.js";

export default async (bot, chatId, messageId, idItem) => {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		const grantItem = await fetchFirst(dbWishes, SQL_COMMANDS.selectWishOfId, [idItem]);

		await execute(dbWishes, SQL_COMMANDS.updateGrantedFieldOfWish, [idItem]);

		await bot.editMessageText(`Желание *${grantItem.title}* исполнено!`, {
			chat_id: chatId,
			message_id: messageId,
			disable_web_page_preview: true,
			parse_mode: "Markdown",
		});
	} catch (error) {
		console.error(error, "GrantItem");
	} finally {
		dbWishes.close();
	}
};
