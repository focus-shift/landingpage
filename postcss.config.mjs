import tailwind from "@tailwindcss/postcss";
import cssnano from "cssnano";

const prod = process.env.NODE_ENV === "production";

export default {
	plugins: [tailwind, prod && cssnano].filter(Boolean),
};
