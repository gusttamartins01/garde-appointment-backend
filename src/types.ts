export type ValidationFieldError = {
	field: string;
	message: string;
};

export type Appointment = {
	id: number;
	dateTime: Date;
	createdAt: Date;
};

export type Holiday = {
	date: string;
	localName: string;
	name: string;
};
