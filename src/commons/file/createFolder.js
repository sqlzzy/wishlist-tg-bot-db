import { existsSync, mkdirSync } from "fs";
import { MESSAGE_FOLDER_EXISTS } from "../constants.js";

function createFolder(path) {
	if (!existsSync(path)) {
		mkdirSync(path, (err) => {
			if (err) throw console.log(err);
		});
	} else {
		console.log(MESSAGE_FOLDER_EXISTS);
	}
}

export default createFolder;
