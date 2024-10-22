const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const DishesController = require("../controllers/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", ensureAuthenticated, dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);

module.exports = dishesRoutes;