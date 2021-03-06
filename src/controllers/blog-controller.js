import Blog from '../models/blog-model';
import * as Keywords from './keyword-controller';
import { RESPONSE_CODES } from '../constants';

export const getAllBlogs = () => {
	return new Promise((resolve, reject) => {
		Blog.find()
			.then((b) => {
				if (b !== null) {
					resolve(b);
				} else {
					reject({ code: RESPONSE_CODES.INTERNAL_ERROR, b });
				}
			}).catch((error) => {
				reject(error);
			});
	});
};

export const getBlog = (id) => {
	return new Promise((resolve, reject) => {
		Blog.find({ _id: id })
			.then((b) => {
				if (b !== null) {
					resolve(b);
				} else {
					reject({ code: RESPONSE_CODES.INTERNAL_ERROR, b });
				}
			}).catch((error) => {
				reject(error);
			});
	});
};

export const createBlog = (blog) => {
	return new Promise((resolve, reject) => {
		if (!(blog.title && blog.body && blog.author)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide title, body, and author' },
			});
		}
		Blog.create({
			title: blog.title,
			date: Date.now(),
			author: blog.author,
			body: blog.body,
			visible: true,
			keywords: blog.keywords,
			comments: [],
		}).then((result) => {
			Keywords.handleKeywordsArray('add', blog.keywords)
				.then((res) => {
					resolve(result);
				});
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};

export const updateBlog = (id, newBlog) => {
	return new Promise((resolve, reject) => {
		// ensure got required inputs
		if (!(id)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide blog id' },
			});
		}
		// update blog
		Blog.find({ _id: id })
			.then((result) => {
				Blog.replaceOne({ _id: id }, newBlog)
					.then((res) => {
						if (result[0].visible !== newBlog.visible) {
							if (newBlog.visible === false) {
								Keywords.handleKeywordsArray('subtract', newBlog.keywords)
									.then((r) => { resolve(newBlog); }).catch((e) => { reject(e); });
							} else {
								Keywords.handleKeywordsArray('add', newBlog.keywords)
									.then((r) => { resolve(r); }).catch((e) => { reject(e); });
							}
						} else if (result[0].keywords.length !== newBlog.keywords.length) {
							Keywords.handleUpdateBlogKeywords(result[0].keywords, newBlog.keywords)
								.then((r) => { resolve(newBlog); }).catch((e) => { reject(e); });
						} else {
							resolve(newBlog);
						}
					})
					.catch((err) => { reject(err); });
			}).catch((error) => {
				reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
			});
	});
};

export const getMostRecentBlogPost = () => {
	return new Promise((resolve, reject) => {
		Blog.find({ visible: true }).sort({ $natural: -1 }).limit(1)
			.then((b) => {
				if (b !== null) {
					resolve(b);
				} else {
					reject({ code: RESPONSE_CODES.INTERNAL_ERROR, b });
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getTotalBlogCount = () => {
	return new Promise((resolve, reject) => {
		Blog.count()
			.then((count) => {
				resolve(count);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
