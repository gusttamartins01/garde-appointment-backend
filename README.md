# Garde Appointment Backend

API REST desenvolvida como parte de um teste técnico para Estagiário Full Stack.

O projeto tem como objetivo fornecer o backend de um sistema de agendamento para uma clínica, permitindo consultar horários disponíveis, criar agendamentos e listar os agendamentos registrados.

A aplicação também realiza a validação de dias úteis e feriados por meio de uma API pública de datas e feriados.

## Funcionalidades

- Consulta de horários disponíveis por data
- Criação de novos agendamentos
- Listagem de agendamentos
- Validação de horários ocupados
- Bloqueio de agendamentos em finais de semana
- Bloqueio de agendamentos em feriados
- Validação do horário de funcionamento
- Persistência dos dados em PostgreSQL
- Integração com API pública de feriados
- Validação dos dados recebidos pela API

## Regras de negócio

O sistema segue as regras definidas no desafio técnico:

- Horário de funcionamento: 08:00 às 18:00
- Cada consulta possui duração de 1 hora
- Não é permitido realizar agendamentos em finais de semana
- Não é permitido realizar agendamentos em feriados
- Não é permitido realizar dois agendamentos para o mesmo horário
- O backend é responsável por validar a disponibilidade antes de criar um agendamento

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker
- Zod
- Pino
- REST API

## Arquitetura

O projeto utiliza uma arquitetura baseada na separação de responsabilidades:

```text
Requisição
   ↓
Rotas
   ↓
Controladores
   ↓
Serviços
   ↓
Prisma / API externa
   ↓
PostgreSQL
```

## Pré-requisitos

Antes de começar, instale:

- Node.js 22 ou superior
- npm
- Docker e Docker Compose
- Git

## Instalação

Clone o projeto e entre na pasta:

```bash
git clone <URL_DO_REPOSITORIO>
cd garde-appointment-backend
```

Instale as dependências:

```bash
npm install
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto usando `.env.example` como modelo.

No macOS/Linux:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Preencha o arquivo `.env` com os valores abaixo:

```env
PORT=3333
LOG_LEVEL=info
NODE_ENV=development
DATABASE_URL="postgresql://admin:admin@localhost:5433/garde_appointment?schema=public"
HOLIDAY_API_URL="https://date.nager.at/api/v3/PublicHolidays/2026/BR"
```

| `LOG_LEVEL` | Nível dos logs, por exemplo `info` ou `debug`. |
| `NODE_ENV` | Ambiente da aplicação, como `development` ou `production`. |
| `DATABASE_URL` | URL de conexão com o PostgreSQL. A porta `5433` é publicada pelo Docker Compose. |
| `HOLIDAY_API_URL` | URL que retorna uma lista JSON de feriados. Cada item precisa ter o campo `date` no formato `YYYY-MM-DD`. |

> A URL de feriados contém o ano. Para consultar outro ano, altere o ano na URL antes de iniciar a aplicação.

## Banco de dados

Suba o PostgreSQL com Docker Compose:

```bash
docker compose up -d database
```

Confira o status do contêiner:

```bash
docker compose ps
```

Aplique as migrations existentes:

```bash
npx prisma migrate deploy
```

Durante o desenvolvimento, ao criar ou alterar uma migration, use:

```bash
npx prisma migrate dev
```

## Executando a API

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Com a configuração padrão, a API ficará disponível em:

```text
http://localhost:3333
```

Para parar o banco quando terminar:

```bash
docker compose down
```

## Tutorial de uso

### 1. Consultar horários disponíveis

Envie uma data no parametro `date`:

```bash
curl "http://localhost:3333/available?date=2026-09-15"
```

Resposta esperada:

```json
[
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
]
```

O endpoint rejeita datas inválidas, finais de semana e feriados.

### 2. Criar um agendamento

Escolha um horário retornado pelo endpoint anterior e envie uma requisição `POST`:

```bash
curl -X POST "http://localhost:3333/appointments" ^
   -H "Content-Type: application/json" ^
   -d "{\"date\":\"2026-09-15\",\"time\":\"10:00\"}"
```

No macOS/Linux, use `\` no lugar de `^` para quebrar linhas:

```bash
curl -X POST "http://localhost:3333/appointments" \
   -H "Content-Type: application/json" \
   -d '{"date":"2026-09-15","time":"10:00"}'
```

O corpo deve conter:

```json
{
  "date": "YYYY-MM-DD",
  "time": "HH:mm"
}
```

Resposta esperada:

```json
{
  "id": 1,
  "dateTime": "2026-09-15T10:00:00.000Z",
  "createdAt": "2026-09-14T12:00:00.000Z"
}
```

O sistema não permite reservar um horário ocupado, fora do expediente, em finais de semana ou em feriados.

### 3. Listar agendamentos

Para consultar todos os agendamentos registrados:

```bash
curl "http://localhost:3333/appointments"
```

## Endpoints

| Método | Rota                         | Descrição                          |
| ------ | ---------------------------- | ---------------------------------- |
| `GET`  | `/available?date=YYYY-MM-DD` | Lista os horarios livres da data.  |
| `POST` | `/appointments`              | Cria um agendamento.               |
| `GET`  | `/appointments`              | Lista os agendamentos cadastrados. |

## Respostas de erro

As mensagens de erro são retornadas em português:

- `400`: dados inválidos, data não válida, fim de semana ou feriado.
- `404`: recurso não encontrado.
- `409`: horário já ocupado ou indisponível.
- `500`: erro interno do servidor.

Exemplo de erro de validação:

```json
{
  "message": "Dados inválidos",
  "fields": [
    {
      "field": "date",
      "message": "Selecione uma data"
    }
  ]
}
```

## Fluxo recomendado

1. Instale as dependencias com `npm install`.
2. Crie e preencha o arquivo `.env`.
3. Suba o PostgreSQL com `docker compose up -d database`.
4. Execute `npx prisma migrate deploy`.
5. Inicie a API com `npm run dev`.
6. Consulte horarios em `/available`.
7. Crie um agendamento em `/appointments`.
8. Confirme os registros usando `GET /appointments`.
