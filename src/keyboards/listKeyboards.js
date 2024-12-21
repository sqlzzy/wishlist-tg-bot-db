import { listKeyboard } from "./buttonsKeyboard.js";

function keyboardForMiddleList(currentPage, sharePageList, shareAllList) {
	return [
		[
			{
				text: listKeyboard.prevPage,
				callback_data: `prev:${currentPage}`,
			},
			{
				text: listKeyboard.nextPage,
				callback_data: `next:${currentPage}`,
			},
		],
		[
			{
				text: listKeyboard.sharePageList,
				switch_inline_query: sharePageList,
			},
		],
		[
			{
				text: listKeyboard.shareAllList,
				switch_inline_query: shareAllList,
			},
		],
		[
			{
				text: listKeyboard.backToMenu,
				callback_data: "backToMenu",
			},
		],
	];
}
function keyboardForLastList(currentPage, sharePageList, shareAllList) {
	return [
		[
			{
				text: listKeyboard.prevPage,
				callback_data: `prev:${currentPage}`,
			},
		],
		[
			{
				text: listKeyboard.sharePageList,
				switch_inline_query: sharePageList,
			},
		],
		[
			{
				text: listKeyboard.shareAllList,
				switch_inline_query: shareAllList,
			},
		],
		[
			{
				text: listKeyboard.backToMenu,
				callback_data: "backToMenu",
			},
		],
	];
}

function keyboardForStartList(currentPage, sharePageList, shareAllList) {
	return [
		[
			{
				text: listKeyboard.nextPage,
				callback_data: `next:${currentPage}`,
			},
		],
		[
			{
				text: listKeyboard.sharePageList,
				switch_inline_query: sharePageList,
			},
		],
		[
			{
				text: listKeyboard.shareAllList,
				switch_inline_query: shareAllList,
			},
		],
		[
			{
				text: listKeyboard.backToMenu,
				callback_data: "backToMenu",
			},
		],
	];
}

function keyboardForListLessTenItems(shareAllList) {
	return [
		[
			{
				text: listKeyboard.shareAllList,
				switch_inline_query: shareAllList,
			},
		],
		[
			{
				text: listKeyboard.backToMenu,
				callback_data: "backToMenu",
			},
		],
	];
}

export default {
	keyboardForMiddleList,
	keyboardForLastList,
	keyboardForStartList,
	keyboardForListLessTenItems,
};
