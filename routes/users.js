const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');

// Criar um novo usuário
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password,
  })
    .then((user) => {
      User.findByPk(user.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});


// Get de todos os usuários
router.get('/', (req, res) => {
  User.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'] // Excluindo colunas desnecessárias
    }
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// Get de usuário por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
});

// Atualizar usuário por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  User.update(
    {
      name,
      email,
      password,
    },
    {
      where: {
        id,
      },
    },
  )
    .then(() => {
      res.json({ message: 'User updated successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

// Deletar usuário por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  User.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

// Restaurar um usuário pelo ID
router.put('/:id/restore', (req, res) => {
  const { id } = req.params;
  User.restore({
    where: {
      id,
    },
  })
    .then(() => {
      res.json({ message: 'User restored successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

// Criar um novo comentário
router.post('/:userId/comments', (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  
  Comment.create({
    userId,
    text,
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => res.status(500).json(err));
});

// Obter todos os comentários de um usuário
router.get('/:userId/comments', (req, res) => {
  const { userId } = req.params;
  
  Comment.findAll({
    where: {
      userId,
    },
  })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(500).json(err));
});

// Obter um comentário por ID
router.get('/:userId/comments/:commentId', (req, res) => {
  const { userId, commentId } = req.params;
  
  Comment.findOne({
    where: {
      userId,
      id: commentId,
    },
  })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    })
    .catch((err) => res.status(500).json(err));
});

// Atualizar um comentário por ID
router.put('/:userId/comments/:commentId', (req, res) => {
  const { userId, commentId } = req.params;
  const { text } = req.body;
  
  Comment.update(
    { text },
    {
      where: {
        userId,
        id: commentId,
      },
    },
  )
    .then(() => {
      res.json({ message: 'Comment updated successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

// Deletar um comentário por ID
router.delete('/:userId/comments/:commentId', (req, res) => {
  const { userId, commentId } = req.params;
  
  Comment.destroy({
    where: {
      userId,
      id: commentId,
    },
  })
    .then(() => {
      res.json({ message: 'Comment deleted successfully' });
    })
    .catch((err) => res.status(500).json(err));
  });

module.exports = router;
