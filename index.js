const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://RodriC8:asdasdd1@rodric8.u1gia4i.mongodb.net/MyFirstDataBase';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })


  .then(async() => {
    Recipe.create({
      title: 'Milanesa',
      level: 'Easy Peasy',
      ingredients: ['breadcrumbs', 'eggs', 'garlic', 'parsley', 'meat'],
      dishType: 'main_course',
      duration: 30,
      creator: 'Lionel Messi',

    })

      .then((newRecipe) => {
        console.log('New recipe added to the database:', newRecipe.title);
      })

      .catch(error => {
        console.error('Error creating your milanesa', error);
      })
      
      Recipe.insertMany(data)
      
      .then((dataRecipes) => {
        console.log('Titles of each recipe:');
        dataRecipes.forEach((recipe) => {
          console.log(recipe.title);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      })

      
      try {
        await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
        console.log("Recipe updated");
      } catch (error) {
        console.log('Error:', error);
      }
    
    })


      


