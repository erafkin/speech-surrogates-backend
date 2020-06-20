import Keyword from '../models/keyword-model';

export const getAllKeywords = () => {
    return new Promise((resolve, reject) => {
        Keyword.find()
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

export const getKeyword = (id) => {
    return new Promise((resolve, reject) => {
        Keyword.find({_id: id})
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

export const createKeyword = (name) => {
    return new Promise((resolve, reject)=>{
        if (!(name)) {
			reject({
				code: RESPONSE_CODES.BAD_REQUEST,
				error: { message: 'Please a name for the keyword' },
			});
        }
        Keyword.create({
            name: name,
            postCount: 1,
        }).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
}

export const incrementKeywordCount = (keyword) => {
        return new Promise((resolve, reject) => {
            Keyword.find( {name: keyword})
            .then((result) => {
                Keyword.replaceOne({_id: result[0]._id}, {_id: result[0]._id, name: result[0].name, postCount: result[0].postCount + 1})
                .then((res)=>{
                    resolve(res);
                })
                .catch((err)=> {
                    reject(err);
                })
            }).catch((error) => {
                reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
            })
        });
};

export const decrementKeywordCount = (keyword) => {
    return new Promise((resolve, reject) => {
        Keyword.find( {name: keyword})
        .then((result) => {
            Keyword.replaceOne({_id: result[0]._id}, {_id: result[0]._id, name: result[0].name, postCount: result[0].postCount - 1})
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=> {
                reject(err);
            })
        }).catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
    });
};

export const handleKeywordsArray = (type, keywords) => {
    return new Promise ((resolve, reject)=> {
        const promises = [];
        promises.push(getAllKeywords()
            .then((allKeywords) =>{
                keywords.forEach((k)=> {
                    let includes = false;
                    allKeywords.forEach((kw)=> {
                        if(kw.name === k) {
                            includes = true;
                        }
                    })
                    if(includes){
                        if(type === "add") {
                            promises.push(incrementKeywordCount(k))
                        } else {
                            promises.push(decrementKeywordCount(k))
                        }
                    } else {
                        promises.push(createKeyword(k))
                    }
                })
            })
        )
        Promise.all(promises).then((res)=>{ resolve(res)}).catch((err)=> reject(err))
    })
    
};
