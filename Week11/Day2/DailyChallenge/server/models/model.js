const db = require('../config/db');

const User = {
  registerUser: async (userData, hashedPassword) => {
    return await db.transaction(async (trx) => {
      
       const [newUser] = await trx('users')
        .insert({
          email: userData.email,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name
        })
        .returning(['id', 'email', 'username', 'first_name', 'last_name']);

      await trx('hashpwd').insert({
        username: userData.username,
        password: hashedPassword
      });

      return newUser;
    });
  },

  findPasswordByUsername: async (username) => {
    const record = await db('hashpwd')
      .select('password')
      .where({ username })
      .first(); 
    
    return record ? record.password : null;
  },

  getAll: async () => {
    return await db('users').select('*').orderBy('id', 'asc');
  },

  getById: async (id) => {
    return await db('users').where({ id }).first(); 
  },

  update: async (id, username, email, first_name, last_name) => {
    const [updatedUser] = await db('users')
      .where({ id })
      .update({ username, email, first_name, last_name })
      .returning('*');
    return updatedUser;
  }//,

  
};

module.exports = User;