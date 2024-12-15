import { getChatId } from "../commons/helpers.js";
import { SQL_COMMANDS, PATH_TO_FILE_DB, MESSAGE_WISH_IS_NOT_EXIST } from "../commons/constants.js";
import sqlite3 from "sqlite3";
import { fetchFirst } from "../commons/sqlHelpers/fetchData.js";
import unrelizedItemKeyboard from "../keyboards/unrelizedItemKeyboard.js";
import grantedItemKeyboard from "../keyboards/grantedItemKeyboard.js";

export default async (bot, msg, idItem) => {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		const wish = await fetchFirst(dbWishes, SQL_COMMANDS.selectWishOfId, [idItem]);

		if (wish) {
			let icon = wish.granted ? "✅" : "⭐";
			let keyboard = wish.granted ? grantedItemKeyboard : unrelizedItemKeyboard;

			await bot.sendMessage(getChatId(msg), `${icon} <a href="${wish.link}">${wish.title}</a>`, {
				parse_mode: "HTML",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: keyboard,
				},
			});
		} else {
			await bot.sendMessage(getChatId(msg), MESSAGE_WISH_IS_NOT_EXIST, {
				parse_mode: "Markdown",
				disable_web_page_preview: true,
			});
		}
	} catch (error) {
		console.log(error, "ShowItem");
	} finally {
		dbWishes.close();
	}
};
