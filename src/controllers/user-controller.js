import User from '../models/user-model';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
import * as Mailer from '../services/mailer'
import { RESPONSE_CODES } from '../constants';
import { parseConnectionUrl } from 'nodemailer/lib/shared';
const { SALT_ROUNDS } = process.env;



export const getUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({"username": username})
        .then((u)=> {
            if (u !== null) {
                resolve(u);
              } else {
                reject(new Error(`User with username: ${username} not found`));
              }
            })
            .catch((error) => {
              reject(error);
            });
        }) 
}

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find()
        .then((u)=> {
            if (u !== null) {
                resolve(u);
              } else {
                reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error });
              }
            })
            .catch((error) => {
              reject(error);
            });
        }) 
}

export const createUser = (user) => {

    return new Promise((resolve, reject)=>{
        if (!(user.username && user.password && user.first_name && user.last_name)) {
          reject({
            code: RESPONSE_CODES.BAD_REQUEST,
            error: { message: 'Please provide first name, last name, username and password' },
          });
        }
        // auto-gen salt and hash the user's password
		bcrypt.hash(user.password, SALT_ROUNDS, null, (err, hash) => {
			if (err) {
        console.log("unable to hash");
				reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: err });
			} else {
                User.create({
                    username: user.username,
                    password: hash,
                    last_name: user.last_name,
                    first_name: user.first_name,
                    type: "admin", //TODO: CHANGE THIS!
                }).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    console.log("error after creating");

                    reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
                })
            }
        });
    });
};

export const updateUser = (id, user) => {
  return new Promise((resolve, reject)=>{
      if (!(user)) {
        reject({
          code: RESPONSE_CODES.BAD_REQUEST,
          error: { message: 'Please provide first name, last name, username and password' },
        });
      }
      console.log(user);
      console.log("1");
      User.replaceOne( {_id: id}, user )
      .then((result) => {
          resolve(result);
      }).catch((error) => {
          reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
      })
    });
};
export const isAuthedUser = (credentials) => {
	return new Promise((resolve, reject) => {
		getUser(credentials.username)
			.then((user) => {
				if (user.password) {
					bcrypt.compare(credentials.password, user.password, (err, result) => {
						if (err) {
							reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: err });
						} else {
							// explicit check to only evaluate boolean
							// (will false a null/undefined instead of returning null/undefined)
							resolve(result === true);
						}
					});
				} else {
					reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: { message: 'Couldn\'t find SaltedPassword field' } });
				}
			})
			.catch((error) => {
				if (error.code.status === RESPONSE_CODES.NOT_FOUND.status) {
					reject({ code: RESPONSE_CODES.UNAUTHORIZED, error: { message: 'Incorrect credentials' } });
				} else {
					reject(error);
				}
			});
	});
};
// generate auth token for the given user
export const tokenForUser = (username) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: username, iat: timestamp }, process.env.AUTH_SECRET);
};

export const resetPassword = (email, username) => {
  return new Promise((resolve, reject)=>{
    if (!(username && email)) {
      reject({
        code: RESPONSE_CODES.BAD_REQUEST,
        error: { message: 'Please provide email and username' },
      });
    }
    let pw = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("new pw:" + pw);
    // auto-gen salt and hash the user's password
    bcrypt.hash(pw, SALT_ROUNDS, null, (err, hash) => {
      if (err) {
        console.log(err);
        reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: err });
      } else {
          User.findOne({username: username})
          .then((u)=> {
            console.log(u);
            const user = {
              username: u.username,
              password: hash,
              first_name: u.first_name,
              last_name: u.last_name,
              type: u.type,
              _id: u._id,
            }
            User.replaceOne({_id: u._id}, user)
            .then((result) => {
              Mailer.resetPasswordEmail(email, pw);
              resolve(user)
            })
            .catch((error) => {
                reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
            })
          })
          .catch((error) => {
            reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
        })
      }
    });
  });
}
