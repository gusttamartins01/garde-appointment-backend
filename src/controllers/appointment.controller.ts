import type { Request, Response } from 'express';
import type { CreateAppointment } from '../schemas/appointment.schema.ts';
import * as AppointmentService from '../services/appointment.service.ts';

export async function getAllAppointments(
	_request: Request,
	response: Response
) {
	const appointments = await AppointmentService.findAllAppointments();

	response.status(200).json(appointments);
}

export async function getAvailableTimes(request: Request, response: Response) {
	const date = request.query.date as string;

	const availableTimes = await AppointmentService.findAvailableTimes(date);

	response.status(200).json(availableTimes);
}

export async function createAppointment(request: Request, response: Response) {
	const body = request.body as CreateAppointment;

	const appointment = await AppointmentService.insertAppointment(body);

	response.status(201).json(appointment);
}
