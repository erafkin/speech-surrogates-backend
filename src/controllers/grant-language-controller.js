import GrantLanguage from '../models/grant-language-model';
import {RESPONSE_CODES} from '../constants'

export const getAllGrantLanguages = () => {
    return new Promise((resolve, reject) => {
        GrantLanguage.find()
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

export const getGrantLanguage = (id) => {
    return new Promise((resolve, reject) => {
        GrantLanguage.find({_id: id})
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

export const createGrantLanguage = (gl) => {
    return new Promise((resolve, reject)=>{
        if (!(gl.name && gl.sections )) {
          reject({
            code: RESPONSE_CODES.BAD_REQUEST,
            error: { message: 'Please provide name and sections' },
          });
        }
        GrantLanguage.create({
            name: gl.name,
            sections: gl.sections
        }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
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

export const deleteGrantLanguage = (id) => {
  return new Promise((resolve, reject) => {
      GrantLanguage.deleteOne({ _id: id }).then((result)=> {
          resolve(result)
      }).catch((error) => {
          reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
      })
  })
}
