const express = require("express");
const app = express();
// Dizendo para o Express usar o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static("public")); // public fica arquivos css, imagem, js de front etc

app.get("/", (requisicao, resposta) => {
  resposta.render("index");
});

app.get("/perguntar", (requisicao, resposta) => {
    
})

app.listen(8080, () => console.log("App rodando."));
