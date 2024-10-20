const knex = require("../database/knex");

class DishesControler {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body;
        const { user_id } = request.params;

        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            price,
            category,
            user_id,
            created_at: knex.raw("DATETIME('now', '-3 hours')"),
            updated_at: knex.raw("DATETIME('now', '-3 hours')")
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                dish_id,
                name,
                user_id,
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        return response.status(201).json({ message: "Prato criado com sucesso!" });
    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();

        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

        return response.json({
            ...dish,
            ingredients
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json({ message: "Prato excluído com sucesso!" })
    }

    async index(request, response) {
        const { user_id } = request.query;

        const dishes = await knex("dishes")
            .where({ user_id })
            .orderBy("name");

        return response.json({ dishes });
    }
}

module.exports = DishesControler;