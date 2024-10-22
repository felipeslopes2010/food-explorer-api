const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const IngredientsController = require("../controllers/IngredientsController");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsController.index);


module.exports = ingredientsRoutes;