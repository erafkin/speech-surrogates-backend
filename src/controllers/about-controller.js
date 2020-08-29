import About from '../models/about-model';

export const getAllAboutPages = () => {
    return new Promise((resolve, reject) => {
        About.find()
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

export const getAboutPage = (id) => {
    return new Promise((resolve, reject) => {
        About.find({_id: id})
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

export const createAboutPage = (about) => {
    return new Promise((resolve, reject)=>{
        if (!(about)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide an About object' },
			});
        }
        console.log(about);
        About.create({
            title: about.title,
            blurb: about.blurb
        }).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}
export const updateAboutPage = (id, about) => {
	return new Promise((resolve, reject) => {
		// ensure got required inputs
		if (!(id)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide the about page id' },
			});
        }
        // update about page
        About.replaceOne({_id: id}, about)
            .then((res)=>{
              resolve(about);
            })
            .catch((err)=> {reject(err)})
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
};

export const deleteAboutPage = (about) => {
    return new Promise((resolve, result) => {
        About.deleteOne({ _id: about }).then((result)=> {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    })
}


