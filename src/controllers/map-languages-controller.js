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
        if (!(ml)) {
          reject({
            code: RESPONSE_CODES.BAD_REQUEST,
            error: { message: 'Please provide a map language' },
          });
        }
        MapLanguage.create({
            continent: ml.continent,
            country: ml.country,
            language: ml.name,
            instrument_family: ml.instrumentFamily,
            instrument_type: ml.instrumentType,
            contrasts_encoded: ml.contrastsEncoded,
            depth_of_encoding: ml.depthOfEncoding,
            content: ml.content, 
            specialization: ml.specialization,
            comprehension: ml.comprehension,
            productivity: ml.productivity,
            summary: ml.summary,
            source: ml.source,
            mentions: ml.mentions,
        }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}

export const updateMapLanguage = (id, ml) => {
	return new Promise((resolve, reject) => {
		// ensure got required inputs
		if (!(id)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please provide map language id' },
			});
        }
        // update map language
        MapLanguage.replaceOne({_id: id}, ml)
          .then((res)=>{
            resolve(ml);
          })
          .catch((err)=> {reject(err)})
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
};
export const deleteMapLanguage = (ml) => {
  return new Promise((resolve, reject) => {
      MapLanguage.deleteOne({ _id: ml }).then((result)=> {
          resolve(result)
      }).catch((error) => {
          reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
      })
  })
}