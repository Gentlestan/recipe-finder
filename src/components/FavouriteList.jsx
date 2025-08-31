import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "./RecipeCard";

const FavoritesList = ({ favorites, onSelect, onToggleFavorite, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="favorites-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-white 
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                         shadow-md hover:shadow-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-700">❤️ Your Favorites</h2>

            {favorites && favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onSelect={(r) => {
                      onSelect(r); 
                      onClose();   // close modal after selecting
                    }}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-6">
                You don’t have any favorite recipes yet.  
                Click the ❤️ on a recipe to add it here.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FavoritesList;
