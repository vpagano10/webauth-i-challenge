
exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'Tom Segura', password: 'B1KE$'},
        {id: 2, username: 'Theo Vonn', password: 'dudemanbrodog'},
        {id: 3, username: 'Andrew Shultz', password: 'Dontsitinthefirstrow'}
      ]);
    });
};
