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

  router.route('/:username')
	// GET all users
	.get((req, res) => {
		User.getUser(req.params.username)
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
	.put((req, res) => {
		User.updateUser(req.params.username, req.body.user)
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
