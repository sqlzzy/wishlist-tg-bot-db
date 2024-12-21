import showItem from "./showItem.js";
import deleteItem from "./deleteItem.js";
import { getChatId, getMessageId } from "../commons/helpers.js";
import grantItem from "./grantItem.js";
import addInfoItem from "./addInfoItem.js";
import showList from "../list/showList.js";
import { REGEXP, MESSAGE_EDIT_INFO } from "../commons/constants.js";
import editWishKeyboard from "../keyboards/editWishKeyboard.js";
import editInfo from "./editInfo.js";

export default async (bot) => {
	try {
		let idItem, currentPage, typeWish;

		await bot.onText(REGEXP.wish_command, async (msg, match) => {
			currentPage = Number(match[1]);
			typeWish = match[2];
			idItem = Number(match[3]);

			await showItem(bot, msg, idItem, currentPage, typeWish);
		});
		await bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
			const chatId = getChatId(callbackQuery.message);
			const data = callbackQuery.data;
			const msg = callbackQuery.message;
			const messageId = getMessageId(msg);
            const fullTypeWish = typeWish === "g" ? "granted" : "unrealized";

			if (REGEXP.back_to_list.test(data)) {
				await showList(bot, chatId, messageId, fullTypeWish, currentPage);
			}

			if (data === "deleteWish") {
				await deleteItem(bot, chatId, messageId, idItem);
			}

			if (data === "grantWish") {
				await grantItem(bot, chatId, messageId, idItem);
			}

			if (data === "addLink") {
				await addInfoItem(bot, chatId, messageId, "link");
			}

			if (data === "editWish") {
				await bot.editMessageText(MESSAGE_EDIT_INFO, {
					chat_id: chatId,
					message_id: messageId,
					disable_web_page_preview: true,
					parse_mode: "Markdown",
					reply_markup: {
						inline_keyboard: editWishKeyboard,
					},
				});
			}

			if (data === "editTitle") {
				await editInfo(bot, chatId, messageId, idItem, "title");
			}

			if (data === "editLink") {
				await editInfo(bot, chatId, messageId, idItem, "link");
			}

			if (data === "back") {
				await showItem(bot, msg, idItem, currentPage, fullTypeWish, true);
			}

			bot.answerCallbackQuery(callbackQuery.id);
		});
	} catch (error) {
		console.error(error, "handleItemButtons");
	}
};
