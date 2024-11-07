# Ah Negão Meme Bot

Este projeto é um bot do Discord que publica automaticamente novos memes do site [Ah Negão!](https://www.ahnegao.com.br) em um canal específico do servidor, com suporte a postagens de imagens e vídeos.

## Funcionalidades

- **Publicação Automática**: O bot verifica periodicamente o feed RSS do site Ah Negão! e posta novos conteúdos no canal do Discord.
- **Suporte para Imagens e Vídeos**: O bot detecta se a postagem contém imagens ou vídeos e faz a postagem correta no Discord.
- **Atraso Configurável**: Define um intervalo entre as postagens de imagens e vídeos para evitar spam.
- **Hot Reload**: Usando `nodemon`, o bot reinicia automaticamente ao detectar alterações no código.
- **Configurações via `.env`**: As configurações sensíveis, como o token do bot e o ID do canal, são armazenadas em um arquivo `.env` para maior segurança e flexibilidade.

## Pré-requisitos

- Node.js (recomendado: versão 14 ou superior)
- Um bot do Discord configurado ([Guia de Configuração do Bot do Discord](https://discord.com/developers/applications))
- Acesso ao feed RSS do site Ah Negão!

## Configuração

1. Clone este repositório:

   ```bash
   git clone https://github.com/rntsza/ahnegaobot.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

   ```plaintext
   DISCORD_TOKEN=seu_discord_token
   CHANNEL_ID=id_do_canal
   RSS_FEED_URL=https://www.ahnegao.com.br/feed
   LOOP_INTERVAL=600000 # Intervalo em milissegundos (10 minutos)
   ```

4. (Opcional) Instale o `nodemon` globalmente para o hot reload:

   ```bash
   npm install -g nodemon
   ```

## Uso

### Iniciar o Bot

Para iniciar o bot normalmente, execute:

```bash
npm start
```

Para iniciar o bot com hot reload (recomenda-se durante o desenvolvimento), execute:

```bash
npm run dev
```

### Scripts Disponíveis

- `npm start`: Inicia o bot normalmente.
- `npm run dev`: Inicia o bot com hot reload usando `nodemon`.

## Estrutura do Código

- `bot.js`: Arquivo principal do bot, contendo a lógica de scraping e publicação de memes.
- `.env`: Arquivo de configuração para variáveis de ambiente sensíveis.
- `package.json`: Gerenciador de dependências do Node.js, incluindo scripts e dependências.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript.
- **discord.js**: Biblioteca para interagir com a API do Discord.
- **rss-parser**: Biblioteca para parsing de feeds RSS.
- **axios**: Biblioteca para fazer requisições HTTP.
- **cheerio**: Biblioteca para manipulação e scraping de HTML.
- **dotenv**: Gerenciador de variáveis de ambiente.
- **nodemon**: Utilitário de hot reload para desenvolvimento.

## Configurações do Nodemon (Opcional)

Para personalizar o comportamento do `nodemon`, crie um arquivo `nodemon.json` com as configurações desejadas:

```json
{
  "watch": ["bot.js"],
  "ext": "js,json",
  "ignore": ["node_modules"],
  "delay": "1000"
}
```

## Contribuições

Sinta-se à vontade para abrir issues ou pull requests se tiver sugestões de melhorias ou encontrar bugs.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

---

Feito com ❤️ por [Renato](https://github.com/rntsza)