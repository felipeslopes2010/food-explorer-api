exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("quantity").notNullable();
    table.integer("status").references("id").inTable("orders_status");

    table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");