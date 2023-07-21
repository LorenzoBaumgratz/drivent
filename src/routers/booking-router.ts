import { Router } from 'express';
import { authenticateToken} from '@/middlewares';
import { getBookingController, postBookingController, putBookingController } from '../controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingController)
  .post('/', postBookingController)
  .put("/:bookingId",putBookingController)

export default bookingRouter;