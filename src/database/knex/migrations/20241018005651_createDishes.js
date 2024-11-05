exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.decimal("price", 3, 2).notNullable();
    table.text("category").notNullable();
    table.text("image");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
