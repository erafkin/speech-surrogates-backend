import { Router } from 'express';
import * as User from '../controllers/user-controller'
import requireAuth from '../auth/require-auth';

const router = Router();
router.route('/')
	// GET all users
	.get((req, res) => {
    User.getAllUsers()
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

  router.route('/:id')
	// GET all users
	.get((req, res) => {
		User.getUser(req.params.id)
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
	})
	.put(requireAuth, (req, res) => {
		User.updateUser(req.params.id, req.body.user)
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

// router.route('/reset-password')
// 	.post((req, res)=> {
// 		console.log(req.body);
// 		User.resetPassword(req.body.email, req.body.username)
// 			.then((response) => {
// 				res.send({ status: 200, error: null, response });
// 			})
// 			.catch((error) => {
// 				res.status(error.code.status).send({
// 					status: error.code.status,
// 					error: error.error,
// 					response: error.code.message,
// 				});
// 			});	
// 		});	


export default router;
