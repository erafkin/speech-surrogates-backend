import MapLanguage from '../models/map-languages-model';
import MapParameter from '../models/map-parameter-model';
import { RESPONSE_CODES } from '../constants';

export const getAllMapLanguages = () => {
	return new Promise((resolve, reject) => {
		MapLanguage.find()
			.then((b) => {
				if (b !== null) {
					MapParameter.find()
						.then((mps) => {
							resolve({ languages: b, parameters: mps });
						}).catch((error) => {
							reject(error);
						});
				} else {
					reject({ code: RESPONSE_CODES.INTERNAL_ERROR, b });
				}
			}).catch((error) => {
				reject(error);
			});
	});
};

export const getMapLanguage = (id) => {
	return new Promise((resolve, reject) => {
		MapLanguage.find({ _id: id })
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

export const createMapLanguage = (ml) => {
	return new Promise((resolve, reject) => {
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
			entry_authors: ml.entryAuthors,
			iso_code: ml.iso_code,
			macrofamily: ml.macrofamily,
		}).then((result) => {
			// Map Parameters: instrument family, instrument type, encoding medium, contrasts encoded, content, specialization
			// multi select : Encoding mechanism, Contrasts encoded, Content, Specialization, depth of encoding
			MapParameter.find().then((mps) => {
				const promises = [];
				promises.push(
					new Promise((r1, r2) => {
						mps.forEach((mp) => {
							let newValues;
							let addedValue;
							switch (mp.parameter) {
							case 'instrument_family':
								if (!mp.values.includes(ml.instrumentFamily)) {
									newValues = mp.values;
									newValues.push(ml.instrumentFamily);
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'instrument_type':
								if (!mp.values.includes(ml.instrumentType)) {
									newValues = mp.values;
									newValues.push(ml.instrumentType);
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'encoding_medium':
								newValues = mp.values;
								addedValue = false;
								ml.encodingMedium.forEach((em) => {
									if (!mp.values.includes(em)) {
										addedValue = true;
										newValues.push(em);
									}
								});
								if (addedValue) {
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'contrasts_encoded':
								newValues = mp.values;
								addedValue = false;
								ml.contrastsEncoded.forEach((ce) => {
									if (!mp.values.includes(ce)) {
										addedValue = true;
										newValues.push(ce);
									}
								});
								if (addedValue) {
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'depth_of_encoding':
								newValues = mp.values;
								addedValue = false;
								ml.depthOfEncoding.forEach((doe) => {
									if (!mp.values.includes(doe)) {
										addedValue = true;
										newValues.push(doe);
									}
								});
								if (addedValue) {
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'content':
								newValues = mp.values;
								addedValue = false;
								ml.content.forEach((c) => {
									if (!mp.values.includes(c)) {
										addedValue = true;
										newValues.push(c);
									}
								});
								if (addedValue) {
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'specialization':
								newValues = mp.values;
								addedValue = false;
								ml.specialization.forEach((s) => {
									if (!mp.values.includes(s)) {
										addedValue = true;
										newValues.push(s);
									}
								});
								if (addedValue) {
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							case 'macrofamily':
								if (!mp.values.includes(ml.macrofamily)) {
									newValues = mp.values;
									newValues.push(ml.macrofamily);
									promises.push(new Promise((res, rej) => {
										MapParameter.replaceOne({ _id: mp._id }, { _id: mp._id, parameter: mp.parameter, values: newValues })
											.then((resu) => { return res(resu); })
											.catch((e) => { return rej(e); });
									}));
								}
								break;
							default:
								break;
							}
						});
						r1('done with loop');
					}),
				);
				Promise.all(promises).then((r) => { resolve(result); }).catch((er) => { return reject({ code: RESPONSE_CODES.INTERNAL_ERROR, er }); });
			});
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};

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
		MapLanguage.replaceOne({ _id: id }, ml)
			.then((res) => {
				resolve(ml);
			})
			.catch((err) => { reject(err); });
	});
};
export const deleteMapLanguage = (ml) => {
	return new Promise((resolve, reject) => {
		MapLanguage.deleteOne({ _id: ml }).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};

export const createParameter = (parameter) => {
	return new Promise((resolve, reject) => {
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
			resolve(result);
		}).catch((error) => {
			reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
		});
	});
};
