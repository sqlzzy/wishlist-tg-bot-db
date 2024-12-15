import { mainKeyboard } from "../keyboards/buttonsKeyboard.js";
import { getChatId, getMessageId } from "../commons/helpers.js";
import addItem from "../item/addItem.js";
import showList from "../list/showList.js";

export default function handleMessages(bot) {
	bot.on("message", (msg) => {
		switch (msg.text) {
			case mainKeyboard.addWish:
				addItem(bot, getChatId(msg));
				break;
			case mainKeyboard.unrealizedWishes:
				bot.removeListener("text");
				showList(bot, getChatId(msg), getMessageId(msg), "unrealized");
				break;
			case mainKeyboard.grantedWishes:
				bot.removeListener("text");
				showList(bot, getChatId(msg), getMessageId(msg), "granted");
				break;
			default:
				return;
		}
	});
}
