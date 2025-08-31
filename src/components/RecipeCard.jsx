import { Heart } from "lucide-react";

const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div
      onClick={() => onSelect(recipe)}
      className="relative border rounded-lg shadow-md overflow-hidden cursor-pointer 
                 hover:scale-105 transition-transform bg-white"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover"
      />

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening details
          onToggleFavorite(recipe);
        }}
        className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
      >
        <Heart
          className={`h-5 w-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <div className="p-3">
        <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-600">{recipe.strArea}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
