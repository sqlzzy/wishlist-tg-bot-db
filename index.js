import TelegramBot from "node-telegram-bot-api";
import { getChatId, getUsername } from "./src/commons/helpers.js";
import mainKeyboard from "./src/keyboards/mainKeyboard.js";
import { ALLOWED_USERNAMES, TOKENS } from "./src/commons/constants.js";
import handleMessages from "./src/messages/handleMessages.js";
import handleListButtons from "./src/list/handleListButtons.js";
import handleItemButtons from "./src/item/handleItemButtons.js";
import initDb from "./src/commons/initDb.js";

const bot = new TelegramBot(TOKENS, { polling: true });

bot.onText(/\/start/, (msg) => {
	const usernameCurrentUser = getUsername(msg);

	if (ALLOWED_USERNAMES.includes(usernameCurrentUser)) {
		initDb();

		bot.sendMessage(
			getChatId(msg),
			`Привет, ${usernameCurrentUser}!\nВыбери команду для начала работы со списом желаний:`,
			{
				reply_markup: {
					inline_keyboard: mainKeyboard,
				},
			},
		);
	} else {
		bot.sendMessage(getChatId(msg), `Извините, ${usernameCurrentUser}, но у вас нет доступа к этому боту!`);
	}
});

handleMessages(bot);
handleListButtons(bot);
handleItemButtons(bot);

bot.on("polling_error", (error) => {
	console.log(error);
});
