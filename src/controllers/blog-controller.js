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

export const getBlog = (id) => {
    return new Promise((resolve, reject) => {
        Blog.find({_id: id})
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

export const createBlog = (blog) => {
    return new Promise((resolve, reject)=>{
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
        }).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}

export const updateVisibility = (id, visibility) => {
    return new Promise ((resolve, reject) => {
        Blog.find({_id: id}).exec()
        .then((blog) => {
            blog[visible] = visibility;
            blog.markModified('visible');
            blog.save().then((result) => {
                resolve(result)
            });
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}



