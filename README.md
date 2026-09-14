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
Request
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Prisma / External API
   ↓
PostgreSQL