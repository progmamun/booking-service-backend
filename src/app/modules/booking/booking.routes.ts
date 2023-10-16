import express from 'express';
import { bookingControllers } from './booking.controller';

const router = express.Router();

router.put('/reset-status', bookingControllers.updateRoomBookingScheduling);
router.post('/:id', bookingControllers.createBooking);
router.get('/', bookingControllers.getallBooking);
router.get('/:id', bookingControllers.getSingleBooking);
router.patch('/:id', bookingControllers.updateBooking);
router.delete('/:id', bookingControllers.deleteBooking);

router.patch('/cancel-booking/:id', bookingControllers.cancelBooking);
router.patch(
  '/update-status/:id',
  bookingControllers.updatebookingStatusByAdmin,
);

export const bookingRoutes = router;
