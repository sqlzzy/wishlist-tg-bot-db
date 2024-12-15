import sendPage from "./sendPage.js";
import { REGEXP } from "../commons/constants.js";

export default async (bot) => {
	try {
		await bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
			const chatId = callbackQuery.message.chat.id;
			const data = callbackQuery.data;
			const messageId = callbackQuery.message.message_id;
			let currentPage = parseInt(data.split(":")[1]);

			if (REGEXP.next_page.test(data)) {
				currentPage += 1;

				await sendPage(bot, chatId, messageId, currentPage);
			} else if (REGEXP.prev_page.test(data)) {
				if (currentPage !== 1) {
					bot.deleteMessage(chatId, messageId);
				}

				currentPage -= 1;

				await sendPage(bot, chatId, messageId, currentPage);
			}

			bot.answerCallbackQuery(callbackQuery.id);
		});
	} catch (error) {
		console.error(error, "handleListButtons");
	}
};
