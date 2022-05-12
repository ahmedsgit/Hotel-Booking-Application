import express from 'express';
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/User.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// routes
// router.get("/authentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in");
// });
// router.get('/varify/:id', verifyUser, (req, res, next) => {
//     res.send(
//         'Hlw User! you are logged in & you can delete your account'
//     );
// });
// router.get('/varifyAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send(
//         'Hlw admin! you are logged in & you can delete all user account'
//     );
// });
router.put('/:id',verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);

export default router;
