import MapLanguage from '../models/map-languages-model';
import MapParameter from '../models/map-parameter-model';
import RESPONSE_CODES from '../constants';

export const getAllMapLanguages = () => {
    return new Promise((resolve, reject) => {
        MapLanguage.find()
        .then((b)=> {
            if (b !== null) {
              MapParameter.find()
              .then((mps) => {
                resolve({languages: b, parameters: mps});
              }).catch((error) => {
                reject(error);
              });
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
            instrument_name: ml.instrumentName,
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
            // multi select : Encoding mechanism, Contrasts encoded, Content, Specialization, depth of encoding
            MapParameter.find().then((mps) => {
              var promises = [];
              promises.push(
                new Promise ((r1, r2) => {
                  mps.forEach((mp) => {
                    switch (mp.parameter) {
                      case "instrument_family":
                        if (!mp.values.includes(ml.instrumentFamily)) {
                          var newVals  = mp.values;
                          newVals.push(ml.instrumentFamily);
                          promises.push(new Promise((res, rej) => {
                              MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newVals})
                              .then((resu) => res(resu))
                              .catch((e) => rej(e));
                          }))
                        }
                        break;
                      case "instrument_type":
                        if (!mp.values.includes(ml.instrumentType)) {
                          var newVals  = mp.values;
                          newVals.push(ml.instrumentType);
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newVals})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))                    
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
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))
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
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))
                        }
                        break;
                      case "depth_of_encoding":
                        var newValues = mp.values;
                        var addedValue = false;
                        ml.depthOfEncoding.forEach((doe) => {
                          if (!mp.values.includes(doe)){
                            addedValue = true;
                            newValues.push(doe);
                          }
                        })
                        if(addedValue) {
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))                   
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
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))                   
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
                          promises.push(new Promise((res, rej) => {
                            MapParameter.replaceOne({_id: mp._id}, {_id: mp._id, parameter: mp.parameter, values: newValues})
                            .then((resu) => res(resu))
                            .catch((e) => rej(e));
                          }))                    
                        }
                        break;
                    }
                  })
                  r1("done with loop");
                })
              );
              Promise.all(promises).then((r) => {console.log("done"); resolve(result)}).catch((er) => reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error }))
            })
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

export const createParameter  = (parameter) => {
  return new Promise((resolve, reject)=>{
    if (!(parameter)) {
    reject({
      code: RESPONSE_CODES.BAD_REQUEST,
      error: { message: 'Please the parameter' },
    });
   }
    MapParameter.create({
        parameter: parameter.parameter,
        values: parameter.values,
    }).then((result) => {
        resolve(result)
    }).catch((error) => {
        reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
    })
});}