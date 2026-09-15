import app from './app.ts';

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
	console.log(`Servidor em execução na porta: http://localhost:${PORT}`);
});
