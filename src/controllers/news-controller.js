import News from '../models/news-model';

export const getAllNews = () => {
    return new Promise((resolve, reject) => {
        News.find()
        .then((b)=> {
            if (b !== null) {
                resolve(b);
              } else {
                reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
              }
            }).catch((error) => {
              reject(error);
            });
        
        }) 
}
export const createNews = (news) => {
    return new Promise((resolve, reject)=>{
        if (!(news)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide a news object' },
			});
        }
        News.create({
            blurb: news.blurb,
            link: news.link ? news.link : null
        }).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}

export const deleteNews = (news) => {
    return new Promise((resolve, result) => {
        News.deleteOne({ _id: news }).then((result)=> {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    })
}


