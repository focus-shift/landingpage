export default {
	eleventyComputed: {
		permalink: data => {
			const pageNumber = data.pagination.pageNumber;
			return pageNumber === 0
				? "/neuigkeiten/update/"
				: `/neuigkeiten/update/seite-${pageNumber + 1}/`;
		},
	},
};
