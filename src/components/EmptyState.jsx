import React from "react";
import { motion } from "framer-motion";

const EmptyState = ({ 
  title = "No recipes found", 
  message = "We couldn’t find any meals matching your search. Try checking your spelling or exploring popular dishes below.", 
  suggestions = [], 
  onSuggestionClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center p-8"
    >
      {/* Illustration / Emoji */}
      <div className="text-6xl mb-4">🍽️</div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex gap-3 flex-wrap justify-center">
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                         text-white text-sm shadow hover:shadow-lg transition"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
