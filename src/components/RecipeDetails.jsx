import React from "react";
import { motion } from "framer-motion";

const RecipeDetails = ({ recipe, onClose, addIngredientsToShoppingList }) => {
  if (!recipe) return null;

  // Extract ingredients + measures
  const getIngredients = (r) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = r[`strIngredient${i}`];
      const meas = r[`strMeasure${i}`];
      if (ing && ing.trim()) {
        list.push(`${meas ? meas.trim() : ""} ${ing.trim()}`.trim());
      }
    }
    return list;
  };

  const ingredients = getIngredients(recipe);

  // Get YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const ytId = getYoutubeId(recipe.strYoutube);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl 
                   w-full max-w-3xl overflow-y-auto max-h-[90vh] p-6"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-white 
                     bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                     shadow-md hover:shadow-lg"
        >
          ✕
        </motion.button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          {recipe.strMeal}
        </h2>
        <p className="text-gray-700 mb-4 italic">
          {recipe.strCategory} • {recipe.strArea}
        </p>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
        />

        {/* Ingredients */}
        <h3 className="text-2xl font-semibold mb-3 text-purple-700">🥗 Ingredients</h3>
        <ul className="list-disc list-inside mb-6 text-gray-800 space-y-1">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* Add to Shopping List Button */}
        <button
          onClick={() =>
            addIngredientsToShoppingList(
              ingredients.map((ing) => ({ name: ing, quantity: "" }))
            )
          }
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Ingredients to Shopping List
        </button>

        {/* Instructions */}
        <h3 className="text-2xl font-semibold mb-3 text-purple-700 mt-6">👨‍🍳 Instructions</h3>
        <p className="text-gray-800 whitespace-pre-line mb-8 leading-relaxed">
          {recipe.strInstructions}
        </p>

        {/* YouTube Video */}
        {ytId && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-purple-700">🎥 Video Tutorial</h3>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Source Link */}
        {recipe.strSource && (
          <p className="text-center">
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View full recipe on TheMealDB →
            </a>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetails;
