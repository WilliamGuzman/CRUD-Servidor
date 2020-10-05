
exports.up = function(knex) {
    var product = knex.schema.withSchema('public').createTable("product",(table)=>{
        table.increments('id').primary().notNullable();
        table.string('Nombre');
        table.integer('Cantidad');
        table.integer('Precio');
        table.string('Descripcion');
      });

      var user = knex.schema.withSchema('public').createTable("user",(table)=>{
        table.increments('id').primary().notNullable();
        table.string('Nombre');
        table.string('Password');
      });

      return Promise.all([product,user]);
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
