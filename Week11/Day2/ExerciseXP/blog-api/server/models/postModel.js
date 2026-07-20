const db = require('../config/db'); // Импортируем настроенный knex

const Post = {
  // Получить все посты
  getAll: async () => {
    return await db('posts').select('*').orderBy('id', 'asc');
  },

  // Получить пост по ID
  getById: async (id) => {
    return await db('posts').where({ id }).first(); 
  },

  // Создать новый пост
  create: async (title, content) => {
    const [newPost] = await db('posts')
      .insert({ title, content })
      .returning('*');
    return newPost;
  },

  // Обновить существующий пост
  update: async (id, title, content) => {
    const [updatedPost] = await db('posts')
      .where({ id })
      .update({ title, content })
      .returning('*');
    return updatedPost;
  },

  // Удалить пост
  delete: async (id) => {
    const [deletedPost] = await db('posts')
      .where({ id })
      .del()
      .returning('*');
    return deletedPost;
  }
};

module.exports = Post;