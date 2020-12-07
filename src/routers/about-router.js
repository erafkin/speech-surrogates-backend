import { Router } from 'express';
import * as About from '../controllers/about-controller';

import requireAuth from '../auth/require-auth';
import { RESPONSE_CODES } from '../constants';


const router = Router();

router.route('/')
	// GET all grant languages
	.get((req, res) => {
        About.getAllAboutPages()
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
    //create a new about page
    .post(requireAuth, (req, res) => {
        if (req.body.user.type === "admin") {
            About.createAboutPage(req.body.about)
            .then((response) => {
                res.send({ status: 200, error: null, response });
            })
            .catch((error) => {
                console.log(error)
                res.send({
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
        About.getAboutPage(req.params.id) 
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
        if (req.body.user.type === "admin") {
            About.updateAboutPage(req.params.id, req.body.about)
            .then((response) => {
                res.send({ status: 200, error: null, response });
            })
            .catch((error) => {
                res.status(error.code.status).send({
                    status: error.code.status,
                    error: error.error,
                    response: error
                });
            });
        }
    })
    .delete(requireAuth, (req, res) => {
        About.deleteAboutPage(req.params.id)
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
    });

export default router;
