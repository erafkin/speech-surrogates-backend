import News from '../models/news-model';
import { RESPONSE_CODES } from '../constants';

export const getAllNews = () => {
	return new Promise((resolve, reject) => {
		News.find()
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
export const createNews = (news) => {
	return new Promise((resolve, reject) => {
		if (!(news)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide a news object' },
			});
		}
		News.create({
			blurb: news.blurb,
			link: news.link ? news.link : null,
		}).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};

export const deleteNews = (news) => {
	return new Promise((resolve, reject) => {
		News.deleteOne({ _id: news }).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};
