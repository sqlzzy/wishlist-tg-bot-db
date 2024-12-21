import KEYBOARDS from "../keyboards/listKeyboards.js";
import { MESSAGE_DISPLAY_BUTTONS_LIST, MESSAGES_STATUS_WISH } from "../commons/constants.js";

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
		let sharePageList = "";
		let shareAllList = "";
		let divider = "\n\n-----";
		let shortTypeWishes = typeWishes[0];

		for (let i = 0; i < pageItems.length; i++) {
			let icon = typeWishes === "granted" ? "✅" : "⭐";
			let status = typeWishes === "granted" ? MESSAGES_STATUS_WISH.granted : MESSAGES_STATUS_WISH.unrelized;

			message += `${icon} /p\\_${currentPage}\\_${shortTypeWishes}\\_w\\_${pageItems[i].id} *${pageItems[i].title}* \n\n`;

			if (pageItems[i].link) {
				sharePageList += `\n\nЖелание № ${i + 1}. \n\nСтатус: ${status}\nЗаголовок: ${
					pageItems[i].title
				}\nСсылка: ${pageItems[i].link}`;
			} else {
				sharePageList += `\n\nЖелание № ${i + 1}. \n\nСтатус: ${status}\nЗаголовок: ${pageItems[i].title}`;
			}

			if (i + 1 !== pageItems.length) {
				sharePageList += divider;
			}
		}

		for (let i = 0; i < list.length; i++) {
			let status = typeWishes === "granted" ? MESSAGES_STATUS_WISH.granted : MESSAGES_STATUS_WISH.unrelized;

			if (list[i].link) {
				shareAllList += `\n\nЖелание № ${i + 1}. \n\nСтатус: ${status}\nЗаголовок: ${list[i].title}\nСсылка: ${
					list[i].link
				}`;
			} else {
				shareAllList += `\n\nЖелание № ${i + 1}. \n\nСтатус: ${status}\nЗаголовок: ${list[i].title}`;
			}

			if (i + 1 !== list.length) {
				shareAllList += divider;
			}
		}

		const keyboard =
			currentPage === 1
				? KEYBOARDS.keyboardForStartList(currentPage, sharePageList, shareAllList)
				: currentPage === totalPages
				? KEYBOARDS.keyboardForLastList(currentPage, sharePageList, shareAllList)
				: currentPage > 1 && currentPage < totalPages
				? KEYBOARDS.keyboardForMiddleList(currentPage, sharePageList, shareAllList)
				: [];

		message += `Всего желаний: *${list.length}* \n`;

		if (list.length > 10) {
			message += `Страница ${currentPage} из ${totalPages}\n\n`;

			await bot.editMessageText(message, {
				chat_id: chatId,
				message_id: messageId,
				reply_markup: {
					inline_keyboard: keyboard,
					resize_keyboard: true,
				},
				parse_mode: "Markdown",
				disable_web_page_preview: true,
			});
		} else {
			message += MESSAGE_DISPLAY_BUTTONS_LIST;

			await bot.editMessageText(message, {
				chat_id: chatId,
				message_id: messageId,
				parse_mode: "Markdown",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: KEYBOARDS.keyboardForListLessTenItems(shareAllList),
					resize_keyboard: true,
				},
			});
		}
	} catch (error) {
		console.error(error, "sendPage");
	}
};
