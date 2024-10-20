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
}

module.exports = DishesControler;