import { itemKeyboard } from "./buttonsKeyboard.js";

export default (typeWish, currentPage, shareText) => {
	return [
		[
			{
				text: itemKeyboard.deleteWish,
				callback_data: "deleteWish",
			},
			{
				text: itemKeyboard.grantWish,
				callback_data: "grantWish",
			},
		],
		[
			{
				text: itemKeyboard.editWish,
				callback_data: "editWish",
			},
			{
				text: itemKeyboard.shareWish,
				switch_inline_query: shareText,
			},
		],
		[
			{
				text: itemKeyboard.backToList,
				callback_data: `backToList_${typeWish}_${currentPage}`,
			},
			{
				text: itemKeyboard.backToMenu,
				callback_data: "backToMenu",
			},
		],
	];
};
