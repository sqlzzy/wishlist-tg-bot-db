import { listKeyboard } from "./buttonsKeyboard.js";

function keyboardForMiddleList(currentPage) {
	return [
		[
			{
				text: listKeyboard.prev,
				callback_data: `prev:${currentPage}`,
			},
			{
				text: listKeyboard.next,
				callback_data: `next:${currentPage}`,
			},
		],
	];
}
function keyboardForLastList(currentPage) {
	return [
		[
			{
				text: listKeyboard.prev,
				callback_data: `prev:${currentPage}`,
			},
		],
	];
}

function keyboardForStartList(currentPage) {
	return [
		[
			{
				text: listKeyboard.next,
				callback_data: `next:${currentPage}`,
			},
		],
	];
}

export default {
	keyboardForMiddleList,
	keyboardForLastList,
	keyboardForStartList,
};
