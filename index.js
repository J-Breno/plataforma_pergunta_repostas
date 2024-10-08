const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log("Error: " + msgErro);
  });
// Dizendo para o Express usar o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static("public")); // public fica arquivos css, imagem, js de front etc
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// rotas
app.get("/", (requisicao, resposta) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    resposta.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (requisicao, resposta) => {
  resposta.render("perguntar");
});

app.post("/salvarpergunta", (requisicao, resposta) => {
  const titulo = requisicao.body.titulo;
  const descricao = requisicao.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    resposta.redirect("/");
  });
});

app.get("/pergunta/:id", (requisicao, resposta) => {
  const id = requisicao.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
            ["id", "DESC"]
    ],
      }).then((respostas) => {
        resposta.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      resposta.redirect("/");
    }
  });
});

app.post("/responder", (requisicao, resposta) => {
  let corpo = requisicao.body.corpo;
  let perguntaId = requisicao.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    resposta.redirect(`/pergunta/${perguntaId}`);
  });
});

app.listen(8080, () => console.log("App rodando."));
