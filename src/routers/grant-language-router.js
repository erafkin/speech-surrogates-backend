import { Router } from 'express';
import * as GrantLanguage from '../controllers/grant-language-controller';

import requireAuth from '../auth/require-auth';
import { RESPONSE_CODES } from '../constants';


const router = Router();

router.route('/')
	// GET all grant languages
	.get((req, res) => {
        GrantLanguage.getAllGrantLanguages()
        .then((response) => {
            res.send({ status: 200, error: null, response });
        })
        .catch((error) => {
            res.status(error.code.status).send({
                status: error.code.status,
                error: error.error,
                response: error.code.message,
            });
        });
    })
    //create a new grant language page
    .post(requireAuth, (req, res) => {
        if (req.body.user.type === "admin"|| req.body.user.type === "contributer") {
            //create a language
            GrantLanguage.createGrantLanguage(req.body.grantLanguage)
            .then((response) => {
                res.send({ status: 200, error: null, response });
            })
            .catch((error) => {
                res.status(error.code.status).send({
                    status: error.code.status,
                    error: error.error,
                    response: error.code.message,
                });
            })
		} else {
			res.status(RESPONSE_CODES.FORBIDDEN.status).send({
				status: RESPONSE_CODES.FORBIDDEN.status,
				error: 'Not authorized for this function',
				response: RESPONSE_CODES.FORBIDDEN.message,
			});
		}
    });

router.route('/:id')
    .get((req, res) => {
        GrantLanguage.getGrantLanguage(req.params.id) 
        .then((response) => {
            res.send({ status: 200, error: null, response });
        })
        .catch((error) => {
            res.status(error.code.status).send({
                status: error.code.status,
                error: error.error,
                response: error.code.message,
            });
        });
    })
    .put(requireAuth, (req, res) => {
        if (req.body.user.type === "admin" || req.body.user.type === "contributor") {
            GrantLanguage.updateGrantLanguage(req.params.id, req.body.grantLanguage)
            .then((response) => {
                res.send({ status: 200, error: null, response });
            })
            .catch((error) => {
                res.status(error.code.status).send({
                    status: error.code.status,
                    error: error.error,
                    response: error.code.message,
                });
            });
        }
    });

export default router;
