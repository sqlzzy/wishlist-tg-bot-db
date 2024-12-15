import showItem from "./showItem.js";
import deleteItem from "./deleteItem.js";
import { getChatId, getMessageId } from "../commons/helpers.js";
import grantItem from "./grantItem.js";
import { REGEXP } from "../commons/constants.js";

export default async (bot) => {
	try {
		let idItem, currentPage;

		await bot.onText(REGEXP.wish_command, async (msg, match) => {
			currentPage = match[1];
			idItem = Number(match[2]);

			showItem(bot, msg, idItem, currentPage);
		});

		await bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
			const chatId = getChatId(callbackQuery.message);
			const data = callbackQuery.data;
			const messageId = getMessageId(callbackQuery.message);

			if (data === "deleteWish") {
				await deleteItem(bot, chatId, messageId, idItem);
			}

			if (data === "grantWish") {
				await grantItem(bot, chatId, messageId, idItem);
			}

			bot.answerCallbackQuery(callbackQuery.id);
		});
	} catch (error) {
		console.error(error, "handleItemButtons");
	}
};
