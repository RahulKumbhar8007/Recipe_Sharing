


const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const routes = express.Router();




// Create a mongoose schema for recipes
const recipeSchema = new mongoose.Schema({
  RecipeName: { type: String, required: true },
  ingredients: { type: [String], required: true },
  method: { type: [String], required: true },
  imagePath: { type: String, required: true },
  totalCookTime: { type: String, required: true },
  email: { type: String, required: true },
  yourName: { type: String, required: true }



});

const Recipe = mongoose.model('Recipes', recipeSchema);

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Define API routes
routes.post('/recipes', upload.single('image'), async (req, res) => {
  try {
    const recipeRequest = req.body;
    const ingredients = JSON.parse(recipeRequest.ingredients);
    const method = JSON.parse(recipeRequest.method);
    const imagePath = req.file.path;
    const Add_recipes = {
      RecipeName: recipeRequest.recipeName,
      ingredients: ingredients,
      method: method,
      imagePath: imagePath,
      totalCookTime: recipeRequest.totalCookTime,
      email: recipeRequest.email,
      yourName: recipeRequest.yourName

    }


    const recipe = new Recipe(Add_recipes);
    await recipe.save();
    res.status(201).json({ message: 'Recipe added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding recipe.' });
  }
});


routes.get('/get_recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);

  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipes.' });
  }
});


// Get a single recipe by ID
routes.get('/get_recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipe.' });
  }
});



module.exports = routes;