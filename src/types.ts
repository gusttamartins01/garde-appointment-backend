export type ValidationFieldError = {
	field: string;
	message: string;
};

export type Appointment = {
	id: number;
	dateTime: Date;
	createdAt: Date;
};
