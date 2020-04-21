// https://stackoverflow.com/a/40022630
const fs = require("fs");
const glob = require("glob");

// JavaScript
const output = {};
const outputPath = "./dist/";

const type = [
	{ name: "javascript", path: "javascript/*.json" },
	{ name: "html", path: "html/*.json" },
	{ name: "css", path: "css/*.json" },
];

type.forEach((item) => {
	package(item);
});

function package({ name, path }) {
	var output = {};

	glob(path, (error, files) => {
		try {
			fs.existsSync(outputPath) || fs.mkdirSync(outputPath);

			fs.accessSync(outputPath, fs.constants.R_OK | fs.constants.W_OK);

			// console.log(`${outputPath} exists, and it is writable`);

			files.forEach((filename) => {
				const contents = JSON.parse(fs.readFileSync(filename, "utf8"));
				Object.assign(output, contents);
			});

			fs.writeFileSync(outputPath + name + ".json", JSON.stringify(output));

			console.log(`${name} Complete! :)`);
		} catch (err) {
			console.error(
				`${outputPath} ${
					err.code === "ENOENT" ? "does not exist" : "is read-only"
				}`
			);
			console.log("Failed! :(");
		}
	});
}

// HTML
