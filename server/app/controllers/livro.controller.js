const db = require("../models");
const Livro = db.livro;

// Criar e salvar
exports.create = (req, res) => {
  // validação
  if (!req.body.titulo) {
    res.status(400).send({ message: "Não pode ser vazio!" });
    return;
  }

  // Criar livro
  const livro = new Livro({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    publicado: req.body.publicado ? req.body.publicado : false
  });

  // salvar
  livro
    .save(livro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ocorreu um erro ao criar esse livro."
      });
    });
};

// recuperar todos os livros.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};

  Livro.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ocorreu algum erro ao recuperar os livros."
      });
    });
};

// encontrar um livro com id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Livro.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado o livro com o ID " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao recuperar o livro de ID " + id });
    });
};

// atualizar o livro com id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "O dado a ser atualizado não pode ser vazio!"
    });
  }

  const id = req.params.id;

  Livro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possível atualizar o livro de ID=${id}. O livro não foi encontrado!`
        });
      } else res.send({ message: "Livro atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o livro de id=" + id
      });
    });
};

// deletar o livro por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Livro.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possível deletar o livro de ID=${id}. livro não encontrado!`
        });
      } else {
        res.send({
          message: "Livro deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao deletar o livro de ID=" + id
      });
    });
};

// Fahrenheit 451.
exports.deleteAll = (req, res) => {
  Livro.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} A biblioteca foi queimada com \"sucesso\"!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "O sistema de incêndio foi acionado com sucesso."
      });
    });
};

// Achar todos os livros publicados
exports.findAllPublicado = (req, res) => {
  Livro.find({ publicado: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Não foi possível recuperar a lista de livros publicados."
      });
    });
};
