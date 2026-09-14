import express from 'express';

const app = express();

app.use(express.json());

app.use('/users', (_request, response) => {
	response.status(200).json({
		name: 'Gustavo Martins',
		email: 'luizgustams@gmail.com'
	});
});

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	console.log(`Server Running on port: http://localhost:${PORT}`);
});
