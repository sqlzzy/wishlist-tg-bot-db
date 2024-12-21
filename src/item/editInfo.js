import { SQL_COMMANDS, PATH_TO_FILE_DB, MESSAGE_EDIT_LINK, MESSAGE_EDIT_TITLE } from "../commons/constants.js";
import sqlite3 from "sqlite3";
import { fetchFirst } from "../commons/sqlHelpers/fetchData.js";
import execute from "../commons/sqlHelpers/execute.js";
import editWishKeyboard from "../keyboards/editWishKeyboard.js";

export default async (bot, chatId, messageId, idItem, typeInfo) => {
	try {
		const messageText = typeInfo !== "title" ? MESSAGE_EDIT_LINK : MESSAGE_EDIT_TITLE;

		await bot.editMessageText(messageText, {
			chat_id: chatId,
			message_id: messageId,
			parse_mode: "Markdown",
			reply_markup: {
				inline_keyboard: editWishKeyboard,
				resize_keyboard: true,
			},
		});
		await bot.on(
			"text",
			async (msg) => {
				saveInfoToDb(bot, chatId, idItem, typeInfo, msg.text);

				bot.removeListener("text");
			},
			{
				disable_web_page_preview: true,
			},
		);
	} catch (error) {
		console.error(error, "GrantItem");
	}
};

async function saveInfoToDb(bot, chatId, idItem, typeInfo, text) {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		const wish = await fetchFirst(dbWishes, SQL_COMMANDS.selectWishOfId, [idItem]);
        console.log(wish, 'wish')

		const insertCommand = typeInfo === "link" ? SQL_COMMANDS.updateLinkWish : SQL_COMMANDS.updateTitleWish;
		const message =
			typeInfo === "link" && wish?.link && wish?.title
				? `Изменена ссылка для желания [${wish?.title}](${wish?.link}): \nстарая: ${wish?.link}\nновая: ${text}\n\n Что-то еще изменить?`
				: typeInfo === "title" && wish.link && wish.title
				? `Изменен заголовок для желания [${wish?.title}](${wish?.link}): \nстарый: ${wish?.title}\nновый: ${text}.\n\n Что-то еще изменить?`
				: typeInfo === "link" && wish?.title
				? `Добавлена ссылка для желания *${wish?.title}*: \nновая: ${text}\n\n Что-то еще изменить?`
				: `Изменен заголовок для желания *${wish?.title}*: \nстарый: ${wish?.title}\nновый: ${text}\n\n Что-то еще изменить?`;

		await execute(dbWishes, insertCommand, [text, idItem]);

		bot.sendMessage(chatId, message, {
			parse_mode: "Markdown",
			reply_markup: {
				inline_keyboard: editWishKeyboard,
				resize_keyboard: true,
			},
			disable_web_page_preview: true,
		});
	} catch (error) {
		console.error(error, "editInfo");
	} finally {
		dbWishes.close();
	}
}
