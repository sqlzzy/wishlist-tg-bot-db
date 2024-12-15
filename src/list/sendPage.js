import KEYBOARDS from "../keyboards/listKeyboards.js";
import { MESSAGE_DISPLAY_BUTTONS_LIST } from "../commons/constants.js";

let list = [];
let typeWishes;

export default async (bot, chatId, messageId, currentPage, items, type) => {
	try {
		if (items) {
			list = items;
		}

		if (type) {
			typeWishes = type;
		}

		const itemsPerPage = 10;

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;

		const pageItems = list.slice(startIndex, endIndex);
		const totalPages = Math.ceil(list.length / itemsPerPage);

		let message = "";

		for (let i = 0; i < pageItems.length; i++) {
			let icon = typeWishes === "granted" ? "✅" : "⭐";

			message += `${icon} /p\\_${currentPage}\\_w\\_${pageItems[i].id} *${pageItems[i].title}* \n\n`;
		}

		const keyboard =
			currentPage === 1
				? KEYBOARDS.keyboardForStartList(currentPage)
				: currentPage === totalPages
				? KEYBOARDS.keyboardForLastList(currentPage)
				: currentPage > 1 && currentPage < totalPages
				? KEYBOARDS.keyboardForMiddleList(currentPage)
				: [];

		message += `Всего желаний: *${list.length}* \n`;

		if (list.length > 10 && currentPage === 1) {
			message += `Страница ${currentPage} из ${totalPages}\n\n`;

			await bot.sendMessage(chatId, message, {
				disable_web_page_preview: true,
				parse_mode: "Markdown",
				reply_markup: {
					inline_keyboard: keyboard,
				},
			});
		} else if (list.length > 10 && currentPage !== 1) {
			message += `Страница ${currentPage} из ${totalPages}\n\n`;

			await bot.editMessageText(message, {
				chat_id: chatId,
				message_id: messageId,
				reply_markup: {
					inline_keyboard: keyboard,
				},
				parse_mode: "Markdown",
				disable_web_page_preview: true,
			});
		} else {
			message += MESSAGE_DISPLAY_BUTTONS_LIST;

			await bot.sendMessage(chatId, message, {
				disable_web_page_preview: true,
				parse_mode: "Markdown",
			});
		}
	} catch (error) {
		console.error(error, "sendPage");
	}
};
