import { Router } from 'express';
import * as Blog from '../controllers/blog-controller';
import requireAuth from '../auth/require-auth';
import { RESPONSE_CODES } from '../constants';


const router = Router();


router.route('/')
	// GET all blogs
	.get((req, res) => {
        Blog.getAllBlogs()
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
    //create a new blog
    .post( requireAuth, (req, res) => {
        if (req.body.user.type === "admin"|| req.body.user.type === "contributer") {
            //create a blog
            Blog.createBlog(req.body.blog)
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
        Blog.getBlog(req.params.id) 
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
        if (req.body.user.type === "admin" || req.body.user.type === "contributer") {
            Blog.updateBlog(req.params.id, req.body.blog)
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
    })

export default router;
