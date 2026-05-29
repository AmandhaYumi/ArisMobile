# ARIS - Agricultura Inteligente Espacial

Aplicativo mobile desenvolvido em React Native com Expo para a Global Solution 2026/1.

## Integrantes

- Nome do integrante 1 - RM
- Nome do integrante 2 - RM
- Nome do integrante 3 - RM

## Links

- GitHub Classroom: coloque aqui o link do repositorio
- Video no YouTube: coloque aqui o link do video

## Descricao da solucao

O ARIS conecta tecnologias de exploracao espacial com agricultura sustentavel na Terra. A proposta utiliza IoT, inteligencia artificial e dados climaticos para monitorar estufas inteligentes, reduzir desperdicio de agua e apoiar decisoes de cultivo.

O aplicativo permite acessar um painel de telemetria, visualizar alertas preditivos, gerenciar culturas agricolas via CRUD integrado com API REST e acompanhar dados de sensores em uma interface inspirada em Marte.

## Funcionalidades mobile

- 6 telas: inicial, login, dashboard, culturas, alertas e cadastro/perfil.
- Navegacao com React Navigation.
- CRUD de culturas usando Axios e API REST.
- Tratamento de loading, erros e feedback visual.
- Identidade visual personalizada com tema espacial, terroso e vermelho escuro.

## Configuracao da API

Por padrao o app chama:

```bash
http://10.0.2.2:8080/api/culturas
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
