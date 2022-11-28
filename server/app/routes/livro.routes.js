module.exports = app => {
  const livros = require("../controllers/livro.controller.js");

  var router = require("express").Router();

  // criar um Livro
  router.post("/", livros.create);

  // recuperar todos os Livros
  router.get("/", livros.findAll);

  // recuperar todos os Livros publicados
  router.get("/publicado", livros.findAllPublicado);

  // recuperar livro com ID
  router.get("/:id", livros.findOne);

  // atualizar livro com ID
  router.put("/:id", livros.update);

  // deletar livro com ID
  router.delete("/:id", livros.delete);

  // Fahrenheit 451
  router.delete("/", livros.deleteAll);

  app.use("/api/livros", router);
};
