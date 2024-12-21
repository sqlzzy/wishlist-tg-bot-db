import { editWishKeyboard } from "./buttonsKeyboard.js";

export default [
	[
		{
			text: editWishKeyboard.editTitle,
			callback_data: "editTitle",
		},
		{
			text: editWishKeyboard.editLink,
			callback_data: "editLink",
		},
	],
	[
		{
			text: editWishKeyboard.back,
			callback_data: `back`,
		},
	],
];
