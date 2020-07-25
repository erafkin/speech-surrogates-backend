import { Router } from 'express';
import * as MapLanguages from '../controllers/map-languages-controller';
import requireAuth from '../auth/require-auth';
import { RESPONSE_CODES } from '../constants';


const router = Router();

router.route('/')
	// GET all news
	.get((req, res) => {
        MapLanguages.getAllMapLanguages()
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
    .post((req, res) => {
            //create a language
            console.log("post map");
            console.log(req.body);
            MapLanguages.createMapLanguage(req.body.payload)
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
    });

// router.route('/:id')
//     .get((req, res) => {
//         News.getNews(req.params.id) 
//         .then((response) => {
//             res.send({ status: 200, error: null, response });
//         })
//         .catch((error) => {
//             res.status(error.code.status).send({
//                 status: error.code.status,
//                 error: error.error,
//                 response: error.code.message,
//             });
//         });
//     })
//     .delete(requireAuth, (req, res) => {
//         //A little bit more risky. However with require auth you can only send request with jwt token and then only admins can 
//         // send it from the site. seems unlikely people will care enough to hack this one part.
//         News.deleteNews(req.params.id)
//         .then((response) => {
//             res.send({ status: 200, error: null, response });
//         })
//         .catch((error) => {
//             res.status(error.code.status).send({
//                 status: error.code.status,
//                 error: error.error,
//                 response: error.code.message,
//             });
//         });
//     });

export default router;
