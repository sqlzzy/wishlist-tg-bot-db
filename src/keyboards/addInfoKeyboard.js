import { addInfoKeyboard } from "./buttonsKeyboard.js";

export default () => {
	const title = [
		[
			{
				text: addInfoKeyboard.backToMenu,
				callback_data: 'backToMenu',
			},
		],
	];
	const link = [
		[
			{
				text: addInfoKeyboard.addLink,
				callback_data: "addLink",
			},
		],
		[
			{
				text: addInfoKeyboard.backToMenu,
				callback_data: 'backToMenu',
			},
		],
	];

	return { title, link };
};
