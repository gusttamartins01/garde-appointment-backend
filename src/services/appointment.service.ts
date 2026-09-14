import { BadRequestError, ConflictError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type { CreateAppointment } from '../schemas/appointment.schema.ts';
import type { Appointment } from '../types.ts';
import { isHoliday } from './holiday.service.ts';

const START_HOUR = 8;
const END_HOUR = 18;

export async function findAllAppointments(): Promise<Appointment[]> {
	const appointments = await prisma.appointment.findMany({
		orderBy: {
			dateTime: 'asc'
		}
	});

	return appointments;
}

export async function findAvailableTimes(date: string): Promise<string[]> {
	const selectedDate = new Date(`${date}T00:00:00`);

	if (Number.isNaN(selectedDate.getTime())) {
		throw new BadRequestError('This date is invalid.');
	}

	const dayOfWeek = selectedDate.getDay();

	if (dayOfWeek === 0 || dayOfWeek === 6) {
		throw new BadRequestError(
			`There are no available time slots on weekends! Please select a valid date.`
		);
	}

	if (await isHoliday(date)) {
		throw new BadRequestError(
			`Appointments are not available on holidays! Please select a valid date.`
		);
	}

	const appointments = await prisma.appointment.findMany({
		where: {
			dateTime: {
				gte: new Date(`${date}T08:00:00`),
				lt: new Date(`${date}T18:00:00`)
			}
		},
		orderBy: {
			dateTime: 'asc'
		}
	});

	const occupiedTimes = new Set(
		appointments.map((appointment) => {
			return appointment.dateTime.toTimeString().slice(0, 5);
		})
	);

	const availableTimes: string[] = [];

	for (let hour = START_HOUR; hour < END_HOUR; hour++) {
		const time = `${String(hour).padStart(2, '0')}:00`;

		if (!occupiedTimes.has(time)) {
			availableTimes.push(time);
		}
	}

	return availableTimes;
}

export async function insertAppointment(
	data: CreateAppointment
): Promise<Appointment> {
	const availableTimes = await findAvailableTimes(data.date);

	if (!availableTimes.includes(data.time)) {
		throw new ConflictError('This time is not available.');
	}

	const dateTime = new Date(`${data.date}T${data.time}:00`);

	return await prisma.appointment.create({
		data: {
			dateTime
		}
	});
}
