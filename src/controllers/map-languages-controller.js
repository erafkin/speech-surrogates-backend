import MapLanguage from '../models/map-languages-model';

export const getAllMapLanguages = () => {
    return new Promise((resolve, reject) => {
        MapLanguage.find()
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

export const getMapLanguage = (id) => {
    return new Promise((resolve, reject) => {
        MapLanguage.find({_id: id})
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

export const createMapLanguage = (ml) => {
    return new Promise((resolve, reject)=>{
        // if (!(ml)) {
        //   reject({
        //     code: RESPONSE_CODES.BAD_REQUEST,
        //     error: { message: 'Please provide a map language' },
        //   });
        // }
        console.log(ml);
        resolve({});
        // MapLanguage.create({
        //     continent: String,
        //     country: String,
        //     language: String,
        //     instrument_family: String,
        //     instrument_type: String,
        //     contrasts_encoded: String,
        //     depth_of_encoding: String,
        //     content: String, 
        //     specialization: String,
        //     comprehension: String,
        //     productivity: String,
        //     summary: String,
        //     source: String,
        //     mentions: String,
        // }).then((result) => {
        //     resolve(result);
        // }).catch((error) => {
        //     reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        // })
    });
}

export const updateGrantLanguage = (id, newGrantLanauge) => {
	return new Promise((resolve, reject) => {
		// ensure got required inputs
		if (!(id)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide grant language id' },
			});
        }
        // update blog
        GrantLanguage.replaceOne({_id: id}, newGrantLanauge)
            .then((res)=>{
              resolve(newGrantLanauge);
            })
            .catch((err)=> {reject(err)})
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
};
