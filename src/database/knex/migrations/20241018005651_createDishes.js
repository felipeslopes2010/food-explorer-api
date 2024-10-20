exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.decimal("price", 3, 2);
    table.text("category");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
