const knex = require("../database/knex");

class DishesControler {
    async create(request, response) {
        const { name, description, price, category, ingredients } = request.body;
        const user_id = request.user.id;

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
        const { name, ingredients } = request.query;
        const user_id = request.user.id;

        let dishes;

        if(ingredients) {
            const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());

            dishes = await knex("ingredients")
                .select([
                    "dishes.id",
                    "dishes.name",
                    "dishes.user_id"
                ])
                .where("dishes.user_id", user_id)
                .whereLike("dishes.name", `%${name}%`)
                .whereIn("ingredients.name", filterIngredients)
                .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
                .groupBy("dishes.id")
        } else if(name) {
             dishes = await knex("dishes")
                .where({ user_id })
                .whereLike("name", `%${name}%`)
        } else {
            dishes = await knex("dishes")
                .where({ user_id })
        }

        const userIngredients = await knex("ingredients").where({ user_id });
        const dishesWithIngredients = dishes.map(dish => {
            const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);

            return {
                ...dish,
                ingredients: dishIngredients
            }
        });

        return response.json(dishesWithIngredients);
    }
}

module.exports = DishesControler;