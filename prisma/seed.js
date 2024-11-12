const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const posts = [
    { guid: "https://www.ahnegao.com.br/?p=291657", link: "https://www.ahnegao.com.br/2024/11/o-cara-que-colocou-uma-camera-de-caca-no-quintal-para-captar-imagens-e-sons-da-vida-selvagem.html" },
    { guid: "https://www.ahnegao.com.br/?p=291653", link: "https://www.ahnegao.com.br/2024/11/o-aniversariante-que-passou-dos-limites-e-sabotou-o-proprio-parabens.html" },
    { guid: "https://www.ahnegao.com.br/?p=291666", link: "https://www.ahnegao.com.br/2024/11/quando-ocorre-um-incendio-mas-o-careca-do-extintor-aparece-pra-salvar-o-dia.html" },
    { guid: "https://www.ahnegao.com.br/?p=291661", link: "https://www.ahnegao.com.br/2024/11/conheca-o-trem-do-asfalto-que-tem-um-carro-velho-como-locomotiva-e-mais-vagoes-do-que-deveria.html" },
    { guid: "https://www.ahnegao.com.br/?p=291632", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-segunda-feira-226.html" },
    { guid: "https://www.ahnegao.com.br/?p=291700", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-videos-curtos-extremamente-imbecis-738.html" },
    { guid: "https://www.ahnegao.com.br/?p=291712", link: "https://www.ahnegao.com.br/2024/11/veja-como-uma-pessoa-pode-ficar-trancada-no-elevador-mesmo-que-ele-esteja-funcionando.html" },
    { guid: "https://www.ahnegao.com.br/?p=291718", link: "https://www.ahnegao.com.br/2024/11/amigo-de-verdade-e-aquele-que-engata-a-re-pro-outro-sem-que-ele-perceba.html" },
    { guid: "https://www.ahnegao.com.br/?p=291706", link: "https://www.ahnegao.com.br/2024/11/como-um-baterista-pode-desestabilizar-o-vocalista-da-banda-com-uma-batidinha.html" },
    { guid: "https://www.ahnegao.com.br/?p=291681", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-terca-feira-226.html" },
    { guid: "https://www.ahnegao.com.br/?p=291766", link: "https://www.ahnegao.com.br/2024/11/as-aventura-do-cara-que-aprendeu-a-dar-grau-no-trator.html" },
    { guid: "https://www.ahnegao.com.br/?p=291759", link: "https://www.ahnegao.com.br/2024/11/a-reacao-dos-trabalhadores-quando-uma-broca-cai-no-poco-de-petroleo.html" },
    { guid: "https://www.ahnegao.com.br/?p=291763", link: "https://www.ahnegao.com.br/2024/11/o-dia-que-os-carrinhos-de-supermercado-se-uniram-pra-atacar-um-unico-carro.html" },
    { guid: "https://www.ahnegao.com.br/?p=291749", link: "https://www.ahnegao.com.br/2024/11/quando-humanos-e-cachorros-sincronizam-ao-acompanhar-a-mesma-bolinha.html" },
    { guid: "https://www.ahnegao.com.br/?p=291727", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-quarta-feira-226.html" },
    { guid: "https://www.ahnegao.com.br/?p=291792", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-videos-curtos-extremamente-imbecis-739.html" },
    { guid: "https://www.ahnegao.com.br/?p=291800", link: "https://www.ahnegao.com.br/2024/11/a-acao-dos-bombeiros-para-resgatar-uma-pessoa-que-ameacava-pular-de-um-predio.html" },
    { guid: "https://www.ahnegao.com.br/?p=291796", link: "https://www.ahnegao.com.br/2024/11/apenas-um-pai-que-extrapolou-enquanto-jogava-bola-com-seu-filho.html" },
    { guid: "https://www.ahnegao.com.br/?p=291809", link: "https://www.ahnegao.com.br/2024/11/a-saga-do-freio-de-mao-o-carro-estragado-fora-de-controle.html" },
    { guid: "https://www.ahnegao.com.br/?p=291773", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-quinta-feira-226.html" },
    { guid: "https://www.ahnegao.com.br/?p=291889", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-imagens-aleatorias-da-semana-531.html" },
    { guid: "https://www.ahnegao.com.br/?p=291871", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-sexta-feira-226.html" },
    { guid: "https://www.ahnegao.com.br/?p=291822", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-sabado-211.html" },
    { guid: "https://www.ahnegao.com.br/?p=291855", link: "https://www.ahnegao.com.br/2024/11/coletanea-dos-memes-mais-peculiares-e-incompreensiveis-enviados-por-leitores-211.html" },
    { guid: "https://www.ahnegao.com.br/?p=291949", link: "https://www.ahnegao.com.br/2024/11/quando-uma-tempestade-se-aproxima-e-a-propria-natureza-resolve-proteger-seu-carro.html" },
    { guid: "https://www.ahnegao.com.br/?p=291957", link: "https://www.ahnegao.com.br/2024/11/o-sistema-simples-porem-eficiente-para-proteger-um-tanque-de-peixes-contra-passaros-predadores.html" },
    { guid: "https://www.ahnegao.com.br/?p=291961", link: "https://www.ahnegao.com.br/2024/11/como-e-o-primeiro-rodeio-de-uma-crianca-que-tem-um-pai-dedicado.html" },
    { guid: "https://www.ahnegao.com.br/?p=291942", link: "https://www.ahnegao.com.br/2024/11/o-que-acontece-quando-uma-raposa-tenta-latir-como-um-cachorro.html" },
    { guid: "https://www.ahnegao.com.br/?p=291922", link: "https://www.ahnegao.com.br/2024/11/coletanea-de-memes-aleatorios-de-segunda-feira-227.html" }
  ];

  for (const post of posts) {
    await prisma.postedMeme.create({
      data: {
        guid: post.guid,
        link: post.link,
        postedAt: new Date("2024-11-11")
      }
    });
  }

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
