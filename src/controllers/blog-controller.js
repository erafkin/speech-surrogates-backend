import Blog from '../models/blog-model';

export const getAllBlogs = () => {
    return new Promise((resolve, reject) => {
        Blog.find()
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



