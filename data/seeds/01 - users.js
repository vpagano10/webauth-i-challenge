
exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, name: 'Tom Segura', password: 'B1KE$'},
        {id: 2, name: 'Theo Vonn', password: 'dudemanbrodog'},
        {id: 3, name: 'Andrew Shultz', password: 'Dontsitinthefirstrow'}
      ]);
    });
};
