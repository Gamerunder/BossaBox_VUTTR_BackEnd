
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tools', table => {
        table.increments('id').primary()
        table.string('title').notNull().defaultTo('...')
        table.string('link').notNull().defaultTo('https://bossabox.com')
        table.string('description').notNull().defaultTo('...')
        table.string('tags').notNull().defaultTo('google')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tools')
};
