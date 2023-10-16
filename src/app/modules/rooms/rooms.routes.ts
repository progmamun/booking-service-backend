import express from 'express';
import { roomController } from './rooms.controller';
const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getallRooms);
router.get('/:id', roomController.getsingleRooms);
router.patch('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);
export const roomRoutes = router;
