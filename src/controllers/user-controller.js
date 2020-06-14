import User from '../models/user-model';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
import { RESPONSE_CODES } from '../constants';
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
				reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: err });
			} else {
                User.create({
                    username: user.username,
                    password: hash,
                    last_name: user.last_name,
                    first_name: user.first_name,
                    type: "none",
                }).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject({ code: RESPONSE_CODES.INTERNAL_ERROR, error: error });
                })
            }
        });
    });
};
