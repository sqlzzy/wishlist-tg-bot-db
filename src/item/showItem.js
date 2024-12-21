import { getChatId, getMessageId } from "../commons/helpers.js";
import {
	SQL_COMMANDS,
	PATH_TO_FILE_DB,
	MESSAGE_WISH_IS_NOT_EXIST,
	MESSAGES_STATUS_WISH,
} from "../commons/constants.js";
import sqlite3 from "sqlite3";
import { fetchFirst } from "../commons/sqlHelpers/fetchData.js";
import unrelizedItemKeyboard from "../keyboards/unrelizedItemKeyboard.js";
import grantedItemKeyboard from "../keyboards/grantedItemKeyboard.js";
import mainKeyboard from "../keyboards/mainKeyboard.js";

export default async (bot, msg, idItem, currentPage, typeWish, isReturn = false) => {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		const wish = await fetchFirst(dbWishes, SQL_COMMANDS.selectWishOfId, [idItem]);

		if (wish) {
			let status = wish.granted ? MESSAGES_STATUS_WISH.granted : MESSAGES_STATUS_WISH.unrelized;
			let keyboard = wish.granted ? grantedItemKeyboard : unrelizedItemKeyboard;
			let message = wish.link
				? `*Информация о желании*\n\n_Заголовок_: ${wish.title}\n_Ссылка_: ${wish.link}`
				: `*Информация о желании*\n\n_Заголовок_: ${wish.title}`;
			let messageForShare = wish.link
				? `\n\nИнформация о желании\n\nСтатус: ${status}\nЗаголовок: ${wish.title}\nСсылка: ${wish.link}`
				: `\n\nИнформация о желании\n\nСтатус: ${status}\nЗаголовок: ${wish.title}`;

			if (isReturn) {
				await bot.editMessageText(message, {
					chat_id: getChatId(msg),
					message_id: getMessageId(msg),
					parse_mode: "Markdown",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: keyboard(typeWish, currentPage, messageForShare),
					},
				});
			} else {
				await bot.sendMessage(getChatId(msg), message, {
					parse_mode: "Markdown",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: keyboard(typeWish, currentPage, messageForShare),
					},
				});
			}
		} else {
			await bot.sendMessage(getChatId(msg), MESSAGE_WISH_IS_NOT_EXIST, {
				parse_mode: "Markdown",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: mainKeyboard,
				},
			});
		}
	} catch (error) {
		console.log(error, "ShowItem");
	} finally {
		dbWishes.close();
	}
};
