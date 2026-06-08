# ARIS Mobile

Aplicativo mobile da solução **ARIS - Agricultura Inteligente Espacial**, desenvolvido em **React Native com Expo** e integrado ao backend em **.NET**.

## Stack

- React Native
- Expo
- React Navigation
- Axios

## Backend

O app consome a API REST do ARIS em:

- Android Emulator: `http://10.0.2.2:5070/api`
- iOS Simulator: `http://localhost:5070/api`
- Celular físico: `http://SEU_IP_LOCAL:5070/api`

## Fluxo de uso

1. Faça login em `POST /auth/login`
2. O app armazena o JWT em memória
3. As rotas protegidas passam a enviar `Authorization: Bearer <token>`
4. O CRUD principal do app utiliza `GET`, `POST`, `PUT` e `DELETE` em `/culturas`

## Estrutura do CRUD

O app foi adaptado para o modelo do ARIS:

- `nome`
- `estufaId`
- `tempMin`
- `tempMax`
- `umidadeMin`
- `umidadeMax`

## Como executar

```bash
npm install
npx expo start
```

## Observações

- O backend precisa estar rodando antes do app.
- Se você for testar em dispositivo físico, use o IP da máquina na rede local.
- Para a demo, utilize o usuário seed do backend:
  - `admin@aris.local`
  - `Admin@123`

