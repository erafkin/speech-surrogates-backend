import MapLanguage from '../models/map-languages-model';
import MapParameter from '../models/map-parameter-model';
import newMapEntry from '../../../speech-surrogates-frontend/src/components/new-map-entry';

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
            encoding_medium: ml.encodingMedium,
            depth_of_encoding: ml.depthOfEncoding,
            content: ml.content, 
            specialization: ml.specialization,
            comprehension: ml.comprehension,
            productivity: ml.productivity,
            summary: ml.summary,
            current_status: ml.currentStatus,
            source: ml.source,
            mentions: ml.mentions,
            entry_authors:  ml.entryAuthors,
            current_status: ml.currentStatus
        }).then((result) => {
            //Map Parameters: instrument family, instrument type, encoding medium, contrasts encoded, content, specialization
            // multi select : Encoding mechanism, Contrasts encoded, Content, Specialization
            MapParameter.find().then((mps) => {
              mps.forEach((mp) => {
                switch (mp.parameter) {
                  case "instrument_family":
                    if (!mp.values.includes(ml.instrumentFamily)) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: mp.values.push(ml.instrumentFamily)})
                    }
                    break;
                  case "instrument_type":
                    if (!mp.values.includes(ml.instrumentType)) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: mp.values.push(ml.instrumentType)})
                    }
                    break;
                  case "encoding_medium":
                    var newValues = mp.values;
                    var addedValue = false;
                    ml.encodingMedium.forEach((em) => {
                      if (!mp.values.includes(em)){
                        addedValue = true;
                        newValues.push(em);
                      }
                    })
                    if(addedValue) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                    }
                    break;
                  case "contrasts_encoded":
                    var newValues = mp.values;
                    var addedValue = false;
                    ml.contrastsEncoded.forEach((ce) => {
                      if (!mp.values.includes(ce)){
                        addedValue = true;
                        newValues.push(ce);
                      }
                    })
                    if(addedValue) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                    }
                    break;
                  case  "content":
                    var newValues = mp.values;
                    var addedValue = false;
                    ml.content.forEach((c) => {
                      if (!mp.values.includes(c)){
                        addedValue = true;
                        newValues.push(c);
                      }
                    })
                    if(addedValue) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                    }
                    break;
                  case "specialization":
                    var newValues = mp.values;
                    var addedValue = false;
                    ml.specialization.forEach((s) => {
                      if (!mp.values.includes(s)){
                        addedValue = true;
                        newValues.push(s);
                      }
                    })
                    if(addedValue) {
                      MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                    }
                    break;
                }
              })
            })
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