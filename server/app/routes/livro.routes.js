module.exports = app => {
  const livro = require("../controllers/livro.controller.js");

  var router = require("express").Router();

  // criar um Livro
  router.post("/", livro.create);

  // recuperar todos os livro
  router.get("/", livro.findAll);

  // recuperar todos os livro publicados
  router.get("/publicado", livro.findAllPublicado);

  // recuperar livro com ID
  router.get("/:id", livro.findOne);

  // atualizar livro com ID
  router.put("/:id", livro.update);

  // deletar livro com ID
  router.delete("/:id", livro.delete);

  // Fahrenheit 451
  router.delete("/", livro.deleteAll);

  app.use("/api/livros", router);
};
