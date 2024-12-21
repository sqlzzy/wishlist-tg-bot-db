import sqlite3 from "sqlite3";
import { SQL_COMMANDS, MESSAGE_ADD_LINK, MESSAGE_ADD_TITLE, PATH_TO_FILE_DB } from "../commons/constants.js";
import execute from "../commons/sqlHelpers/execute.js";
import addInfoKeyboard from "../keyboards/addInfoKeyboard.js";
import mainKeyboard from "../keyboards/mainKeyboard.js";

let infoItem = { granted: 0 };

async function addInfoItem(bot, chatId, messageId, typeInfo = "title") {
	try {
		const messageText = typeInfo !== "title" ? MESSAGE_ADD_LINK : MESSAGE_ADD_TITLE;

		await bot.editMessageText(messageText, {
			chat_id: chatId,
			message_id: messageId,
			parse_mode: "Markdown",
			reply_markup: {
				inline_keyboard: addInfoKeyboard.title,
				resize_keyboard: true,
			},
		});
		await bot.on(
			"text",
			async (msg) => {
				if (typeInfo === "link") {
					addLink(bot, chatId, msg.text);
				} else {
					addTitle(bot, chatId, msg.text);
				}

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

async function addTitle(bot, chatId, title) {
	try {
		infoItem.title = title;

		addItemToDb(bot, chatId);

		await bot.sendMessage(
			chatId,
			`
Добавлено название желания - *${title}*.
Желаете добавить ссылку?`,
			{
				parse_mode: "Markdown",
				reply_markup: {
					inline_keyboard: addInfoKeyboard.link,
					resize_keyboard: true,
				},
			},
		);
	} catch (error) {
		console.error(error);
	}
}

async function addLink(bot, chatId, link) {
	try {
		infoItem.link = link;

		await addItemToDb(bot, chatId);
	} catch (error) {
		console.error(error);
	}
}

async function addItemToDb(bot, chatId) {
	const dbWishes = new sqlite3.Database(PATH_TO_FILE_DB, sqlite3.OPEN_READWRITE);

	try {
		const insertCommand = infoItem.link ? SQL_COMMANDS.insertLinkWish : SQL_COMMANDS.insertTitleWish;
		const insertData = infoItem.link ? [infoItem.link, infoItem.title] : [infoItem.title, infoItem.granted];
		const message = infoItem.link
			? `Добавлена ссылка для желания: [${infoItem?.title}](${infoItem?.link})`
			: `Добавлено желание: *${infoItem?.title}*`;

		await execute(dbWishes, insertCommand, insertData);

		if (infoItem.link) {
			bot.sendMessage(chatId, message, {
				parse_mode: "Markdown",
				reply_markup: {
					inline_keyboard: mainKeyboard,
					resize_keyboard: true,
				},
				disable_web_page_preview: true,
			});

			infoItem = { granted: 0 };
		}
	} catch (error) {
		console.error(error, "AddItem");
	} finally {
		dbWishes.close();
	}
}

export default addInfoItem;
