import type { Holiday } from '../types.ts';

const HOLIDAY_API = process.env.HOLIDAY_API_URL;

export async function isHoliday(date: string): Promise<boolean> {
	if (!HOLIDAY_API) {
		throw new Error('A variável HOLIDAY_API_URL não foi definida.');
	}

	const response = await fetch(HOLIDAY_API);

	if (!response.ok) {
		throw new Error('Falha ao consultar os feriados.');
	}

	const holidays: Holiday[] = await response.json();

	return holidays.some((holiday) => holiday.date === date);
}
