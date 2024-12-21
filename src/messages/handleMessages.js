import { MESSAGE_BACK_TO_MENU } from "../commons/constants.js";
import { getChatId, getMessageId } from "../commons/helpers.js";
import addInfoItem from "../item/addInfoItem.js";
import mainKeyboard from "../keyboards/mainKeyboard.js";
import showList from "../list/showList.js";

export default async (bot) => {
	try {
		await bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
			const chatId = getChatId(callbackQuery.message);
			const data = callbackQuery.data;
			const messageId = getMessageId(callbackQuery.message);

			try {
				if (data === "addWish") {
					await addInfoItem(bot, chatId, messageId, "title");
				}

				if (data === "showUnrealizedWishes") {
					await bot.removeListener("text");
					await showList(bot, chatId, messageId, "unrealized");
				}

				if (data === "showGrantedWishes") {
					await bot.removeListener("text");
					await showList(bot, chatId, messageId, "granted");
				}

				if (data === "backToMenu") {
					bot.removeListener("text");

					await bot.editMessageText(MESSAGE_BACK_TO_MENU, {
						chat_id: chatId,
						message_id: messageId,
						parse_mode: "Markdown",
						reply_markup: {
							inline_keyboard: mainKeyboard,
							resize_keyboard: true,
						},
					});
				}

				bot.answerCallbackQuery(callbackQuery.id);
			} catch (error) {
				bot.answerCallbackQuery(callbackQuery.id);
				console.log(error, "HandleMessages callbackQuery");
			}

			await bot.on("inline_query", (query) => {
				try {
					bot.answerInlineQuery(query.id);
					console.log(query, "query");
				} catch (error) {
					console.log(error, "HandleMessages inline_query");
				}
			});
		});
	} catch (error) {
		console.error(error, "handleListButtons");
	}
};
