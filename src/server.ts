import app from './app.ts';

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
