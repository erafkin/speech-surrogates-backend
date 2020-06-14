import { Router } from 'express';
const router = Router();


router.route('/').get((req, res) => {
  res.send('Welcome to the speech surrogates api');
});

export default router;
