import { Router } from 'express';
import * as News from '../controllers/news-controller';
import requireAuth from '../auth/require-auth';
import { RESPONSE_CODES } from '../constants';


const router = Router();

router.route('/')
	// GET all news
	.get((req, res) => {
		News.getAllNews()
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
// create a new grant language page
	.post(requireAuth, (req, res) => {
		// only admins can create the news (aka laura)
		if (req.body.user.type === 'admin') {
			// create a language
			News.createNews(req.body.news)
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
		News.getNews(req.params.id)
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
	.delete(requireAuth, (req, res) => {
		// A little bit more risky. However with require auth you can only send request with jwt token and then only admins can
		// send it from the site. seems unlikely people will care enough to hack this one part.
		News.deleteNews(req.params.id)
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
