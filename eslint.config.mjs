import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
	{
		ignores: ["dist/*", "build/*"],
	},
	pluginJs.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		files: ["src/**", "static/**"],
		languageOptions: {
			globals: globals.browser,
		},
	},
	{
		files: [".eleventy.js", "!src/**", "!static/**"],
		languageOptions: {
			globals: globals.node,
		},
	},
];
