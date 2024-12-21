import { mainKeyboard } from "./buttonsKeyboard.js";

export default [
	[
		{
			text: mainKeyboard.addWish,
			callback_data: "addWish",
		},
	],
	[
		{
			text: mainKeyboard.unrealizedWishes,
			callback_data: "showUnrealizedWishes",
		},
		{
			text: mainKeyboard.grantedWishes,
			callback_data: "showGrantedWishes",
		},
	],
];
