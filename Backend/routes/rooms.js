import express from 'express';

const router = express.Router();

// routes
router.get('/', (req, res) => {
  res.send('hello, this is Room');
});
router.get('/register', (req, res) => {
  res.send('Room register page');
});

export default router;
