exports.up = async knex => {
    await knex.schema.createTable("orders_status", table => {
        table.increments("id").primary();
        table.string("code").notNullable();
        table.string("name").notNullable();
    });

    await knex("orders_status").insert([
        { code: '1', name: 'Em Andamento' },
        { code: '2', name: 'Finalizado' },
    ]);
};

exports.down = async knex => {
    await knex.schema.dropTable("orders_status");
};
