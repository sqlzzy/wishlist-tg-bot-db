export function getChatId(msg) {
	return msg.chat.id;
}

export function getUsername(msg) {
	return msg.from.username;
}

export function getMessageId(msg) {
	return msg.message_id;
}
