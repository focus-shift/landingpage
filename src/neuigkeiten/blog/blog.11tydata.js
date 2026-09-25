export default {
	eleventyComputed: {
		permalink: data => {
			const pageNumber = data.pagination.pageNumber;
			return pageNumber === 0
				? "/neuigkeiten/blog/"
				: `/neuigkeiten/blog/seite-${pageNumber + 1}/`;
		},
	},
};
