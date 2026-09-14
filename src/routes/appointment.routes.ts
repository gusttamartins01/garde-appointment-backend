import { Router } from 'express';
import * as AppointmentControllers from '../controllers/appointment.controller.ts';
import validate from '../middlewares/validate.ts';
import { createAppointmentSchema } from '../schemas/appointment.schema.ts';

const router = Router();

router.get('/appointments', AppointmentControllers.getAllAppointments);

router.get('/available', AppointmentControllers.getAvailableTimes);

router.post(
	'/appointments',
	validate(createAppointmentSchema),
	AppointmentControllers.createAppointment
);

export default router;
