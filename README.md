# Agricultura Inteligente Espacial

Aplicativo mobile desenvolvido em React Native com Expo para a Global Solution 2026/1.

## Integrantes

- Nome do integrante 1 - RM
- Nome do integrante 2 - RM
- Nome do integrante 3 - RM

## Links

- GitHub Classroom: cole aqui o link do repositorio
- Video no YouTube: cole aqui o link do video

## Descricao da solucao

O aplicativo apresenta uma interface mobile para monitoramento de cultivo inteligente, com foco em usabilidade, identidade visual terrosa e fluxo simples de acesso.

A experiencia inclui tela inicial com escolha entre login e cadastro, navegacao com React Navigation, perfil com sair e excluir conta, dashboard, alertas e um CRUD completo de culturas integrado com API REST.

## Funcionalidades mobile

- 7 telas: inicial, login, cadastro, perfil, painel, culturas e alertas.
- Navegacao com React Navigation.
- CRUD de culturas usando Axios e API REST.
- Tratamento de loading, erros e feedback visual.
- Identidade visual personalizada com tema escuro em tons de vermelho e marrom.

## Configuracao da API

Por padrao o app chama:

```bash
http://10.0.2.2:8080/api
```

Para trocar a URL, use a variavel:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP:8080/api
```

Endpoints esperados para o CRUD:

- `GET /culturas`
- `POST /culturas`
- `PUT /culturas/{id}`
- `DELETE /culturas/{id}`

Campos usados no app:

- `nome`
- `especie`
- `areaCultivo`
- `status`

## Como executar

```bash
npm install
npm start
```

Depois, abra no Expo Go, emulador Android ou navegador.
