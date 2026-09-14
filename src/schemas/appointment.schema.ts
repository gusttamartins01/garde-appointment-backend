import { z } from 'zod';

export const createAppointmentSchema = z.object({
	date: z.string().min(1, 'Selecione uma data'),
	time: z.string().min(1, 'Selecione um horário')
});

export type CreateAppointment = z.infer<typeof createAppointmentSchema>;
